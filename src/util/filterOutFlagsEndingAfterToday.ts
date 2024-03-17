import { OptimizelyFlag } from "../types";
import { Inputs } from "./inputs";

export function filterOutFlagsEndingAfterToday(
  flags: OptimizelyFlag[]
): OptimizelyFlag[] {
  return flags.filter(({ variable_definitions }) => {
    const end_date =
      variable_definitions[Inputs.flagEndDateVariableName]?.default_value;
    if (end_date === undefined) return true;

    const today = new Date();
    const parsed_end_date = new Date(end_date);
    return today > parsed_end_date;
  });
}
