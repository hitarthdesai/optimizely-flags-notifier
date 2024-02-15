import { OptimizelyFlag } from "../types";

export function filterOutFlagsEndingAfterToday(
  flags: OptimizelyFlag[]
): OptimizelyFlag[] {
  return flags.filter(({ variable_definitions }) => {
    const end_date = variable_definitions["end_date"];
    if (end_date === undefined) return true;

    const today = new Date();
    const parsed_end_date = new Date(
      end_date.default_value.split(",").map(Number)
    );

    return today > parsed_end_date;
  });
}
