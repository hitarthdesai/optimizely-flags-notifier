import { getInput } from "@actions/core";
import { config } from "dotenv";
import {
  TrimmedOptimizelyFlag,
  requiredString,
  trimmedOptimizelyFlag,
} from "./types";
import { buildSlackMessage } from "./util/buildSlackMessage";
import { getAllFlags } from "./util/getAllFlags";
import { sendSlackMessage } from "./util/sendSlackMessage";

const flag_age_map = {
  TWO_WEEKS_OR_LESS: 60 * 60 * 24 * 14,
  ONE_MONTH_OR_LESS: 60 * 60 * 24 * 30,
  THREE_MONTHS_OR_LESS: 60 * 60 * 24 * 30 * 3,
  SIX_MONTHS_OR_LESS: 60 * 60 * 24 * 30 * 6,
  ONE_YEAR_OR_LESS: 60 * 60 * 24 * 365,
  MORE_THAN_ONE_YEAR: -1,
} as const;

export type FlagAge = keyof typeof flag_age_map;

config();

async function run_action(): Promise<void> {
  const project_id = requiredString.parse(
    getInput("optimizely_project_id") || process.env.OPTIMIZELY_PROJECT_ID
  );
  const optimizely_auth_token = requiredString.parse(
    getInput("optimizely_auth_token") || process.env.OPTIMIZELY_AUTH_TOKEN
  );

  /* Get all the flags */
  const flags = await getAllFlags({
    project_id,
    optimizely_auth_token,
  });

  /* Remove flags that have been marked with a is_permanent=true variable */
  const temporary_flags = flags.filter(({ variable_definitions }) => {
    const is_permanent_variable = variable_definitions["is_permanent"];
    if (!is_permanent_variable) return true;

    return is_permanent_variable.defaultValue !== "true";
  });

  /* Remove flags that have a specified end date after todays date */
  const active_flags = temporary_flags.filter(({ variable_definitions }) => {
    const end_date = variable_definitions["end_date"];
    if (end_date === undefined) return true;

    const today = new Date();
    return today > new Date(end_date.defaultValue);
  });

  /* Categorize flags depending on how old they are */
  const flag_map = new Map<FlagAge, TrimmedOptimizelyFlag[]>();
  active_flags.forEach(({ key, name, updated_time }) => {
    const last_modified = new Date(updated_time);
    const today = new Date();
    const time_difference = (today.getTime() - last_modified.getTime()) / 1000;

    let age_key: FlagAge = "MORE_THAN_ONE_YEAR";
    if (time_difference <= flag_age_map.TWO_WEEKS_OR_LESS) {
      age_key = "TWO_WEEKS_OR_LESS";
    } else if (time_difference <= flag_age_map.ONE_MONTH_OR_LESS) {
      age_key = "ONE_MONTH_OR_LESS";
    } else if (time_difference <= flag_age_map.THREE_MONTHS_OR_LESS) {
      age_key = "THREE_MONTHS_OR_LESS";
    } else if (time_difference <= flag_age_map.SIX_MONTHS_OR_LESS) {
      age_key = "SIX_MONTHS_OR_LESS";
    } else if (time_difference <= flag_age_map.ONE_YEAR_OR_LESS) {
      age_key = "ONE_YEAR_OR_LESS";
    }

    const trimmed_flag = trimmedOptimizelyFlag.parse({ key, name });
    if (flag_map.has(age_key)) {
      flag_map.get(age_key)?.push(trimmed_flag);
    } else {
      flag_map.set(age_key, [trimmed_flag]);
    }
  });

  /* Build the slack message from the above given map */
  const message = buildSlackMessage({
    project_id,
    flags_by_age: flag_map,
  });

  /* Send the slack message */
  const slack_webhook_url = requiredString.parse(
    getInput("slack_webhook_url") || process.env.SLACK_WEBHOOK_URL
  );
  const channel_id = requiredString.parse(
    getInput("channel_id") || process.env.SLACK_CHANNEL_ID
  );
  const slack_app_bot_token = requiredString.parse(
    getInput("slack_app_bot_token") || process.env.SLACK_APP_BOT_TOKEN
  );

  await sendSlackMessage({
    slack_webhook_url,
    channel_id,
    slack_app_bot_token,
    blocks: message,
  });
}

void run_action();
