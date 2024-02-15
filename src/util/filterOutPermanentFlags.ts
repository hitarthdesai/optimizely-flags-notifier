import { OptimizelyFlag } from "../types";

export function filterOutPermanentFlags(
  flags: OptimizelyFlag[]
): OptimizelyFlag[] {
  return flags.filter(({ variable_definitions }) => {
    const is_permanent_variable = variable_definitions["is_permanent"];
    if (!is_permanent_variable) return true;

    return is_permanent_variable.default_value !== "true";
  });
}
