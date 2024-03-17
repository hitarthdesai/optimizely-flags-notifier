import { OptimizelyFlag } from "../types";
import { Inputs } from "./inputs";

export function filterOutPermanentFlags(
  flags: OptimizelyFlag[]
): OptimizelyFlag[] {
  return flags.filter(({ variable_definitions }) => {
    const is_permanent_variable =
      variable_definitions?.[Inputs.permanentFlagVariableName]?.default_value;
    if (!is_permanent_variable) return true;

    return is_permanent_variable !== "true";
  });
}
