/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { flagAgeDetailsMap } from "../constants";
import { FlagAge } from "../types";

const todayMs = new Date().getTime();

export function getFlagAgeFromLastModifiedDate(updated_time: string): FlagAge {
  const lastModifiedMs = new Date(updated_time).getTime();
  const time_difference = (todayMs - lastModifiedMs) / 1000;

  if (time_difference <= flagAgeDetailsMap.TWO_WEEKS_OR_LESS?.time!) {
    return "TWO_WEEKS_OR_LESS";
  } else if (time_difference <= flagAgeDetailsMap.ONE_MONTH_OR_LESS?.time!) {
    return "ONE_MONTH_OR_LESS";
  } else if (time_difference <= flagAgeDetailsMap.THREE_MONTHS_OR_LESS?.time!) {
    return "THREE_MONTHS_OR_LESS";
  } else if (time_difference <= flagAgeDetailsMap.SIX_MONTHS_OR_LESS?.time!) {
    return "SIX_MONTHS_OR_LESS";
  } else if (time_difference <= flagAgeDetailsMap.ONE_YEAR_OR_LESS?.time!) {
    return "ONE_YEAR_OR_LESS";
  }
  return "MORE_THAN_ONE_YEAR";
}
