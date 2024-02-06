import { config } from "dotenv";
import { flagAgeDetailsMap } from "./constants";
import { FlagAge, trimmedOptimizelyFlag } from "./types";
import { buildSlackMessage } from "./util/buildSlackMessage";
import { getAllFlags } from "./util/getAllFlags";
import { Inputs } from "./util/inputs";
import { sendSlackMessage } from "./util/sendSlackMessage";

config();

async function run_action(): Promise<void> {
  Inputs.parseInputs();

  /* Get all the flags */
  const flags = await getAllFlags();

  /* Remove flags that have been marked with a is_permanent=true variable */
  const temporary_flags = flags.filter(({ variable_definitions }) => {
    const is_permanent_variable = variable_definitions["is_permanent"];
    if (!is_permanent_variable) return true;

    return is_permanent_variable.default_value !== "true";
  });

  /* Remove flags that have a specified end date after todays date */
  const active_flags = temporary_flags.filter(({ variable_definitions }) => {
    const end_date = variable_definitions["end_date"];
    if (end_date === undefined) return true;

    const today = new Date();
    const parsed_end_date = new Date(
      end_date.default_value.split(",").map(Number)
    );

    return today > parsed_end_date;
  });

  /* Categorize flags depending on how old they are */
  active_flags.forEach(({ key, name, updated_time }) => {
    const last_modified = new Date(updated_time);
    const today = new Date();
    const time_difference = (today.getTime() - last_modified.getTime()) / 1000;

    let age_key: FlagAge = "MORE_THAN_ONE_YEAR";
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    if (time_difference <= flagAgeDetailsMap.TWO_WEEKS_OR_LESS?.time!) {
      age_key = "TWO_WEEKS_OR_LESS";
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    } else if (time_difference <= flagAgeDetailsMap.ONE_MONTH_OR_LESS?.time!) {
      age_key = "ONE_MONTH_OR_LESS";
    } else if (
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      time_difference <= flagAgeDetailsMap.THREE_MONTHS_OR_LESS?.time!
    ) {
      age_key = "THREE_MONTHS_OR_LESS";
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    } else if (time_difference <= flagAgeDetailsMap.SIX_MONTHS_OR_LESS?.time!) {
      age_key = "SIX_MONTHS_OR_LESS";
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    } else if (time_difference <= flagAgeDetailsMap.ONE_YEAR_OR_LESS?.time!) {
      age_key = "ONE_YEAR_OR_LESS";
    }

    const trimmed_flag = trimmedOptimizelyFlag.parse({ key, name });
    flagAgeDetailsMap[age_key]?.flags.push(trimmed_flag);
  });

  /* Build the slack message from the above given map */
  const message = buildSlackMessage();

  /* Send the slack message */
  await sendSlackMessage({
    blocks: message,
  });
}

void run_action();
