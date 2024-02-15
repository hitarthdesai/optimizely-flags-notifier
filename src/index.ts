import { config } from "dotenv";
import { flagAgeDetailsMap } from "./constants";
import { trimmedOptimizelyFlag } from "./types";
import { buildSlackMessage } from "./util/buildSlackMessage";
import { filterOutFlagsEndingAfterToday } from "./util/filterOutFlagsEndingAfterToday";
import { filterOutPermanentFlags } from "./util/filterOutPermanentFlags";
import { getAllFlags } from "./util/getAllFlags";
import { getFlagAgeFromLastModifiedDate } from "./util/getFlagAgeFromLastModifiedDate";
import { Inputs } from "./util/inputs";
import { sendSlackMessage } from "./util/sendSlackMessage";

config();

async function run_action(): Promise<void> {
  Inputs.parseInputs();

  /* Get all the flags */
  const flags = await getAllFlags();

  /* Remove flags that have been marked with a is_permanent=true variable */
  const temporaryFlags = filterOutPermanentFlags(flags);

  /* Remove flags that have a specified end date after todays date */
  const activeFlags = filterOutFlagsEndingAfterToday(temporaryFlags);

  /* Categorize flags depending on how old they are */
  activeFlags.forEach(({ key, name, updated_time }) => {
    const ageKey = getFlagAgeFromLastModifiedDate(updated_time);
    const trimmedFlag = trimmedOptimizelyFlag.parse({ key, name });
    flagAgeDetailsMap[ageKey]?.flags.push(trimmedFlag);
  });

  /* Build the slack message from the above given map */
  const message = buildSlackMessage();

  /* Send the slack message */
  await sendSlackMessage({
    blocks: message,
  });
}

void run_action();
