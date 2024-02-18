import { z } from "zod";

export const requiredString = z.string().min(1);

export const optimizelyFlag = z.object({
  key: z.string(),
  name: z.string(),
  variable_definitions:
    z.any() /* TODO: Need to find a stricter way to type this */,
  updated_time: z.string(),
});
export const optimizelyFlags = z.array(optimizelyFlag);

export type OptimizelyFlag = z.infer<typeof optimizelyFlag>;

export const trimmedOptimizelyFlag = z.object({
  key: z.string(),
  name: z.string(),
});

export type TrimmedOptimizelyFlag = z.infer<typeof trimmedOptimizelyFlag>;

export const flagAgeDetails = z.object({
  time: z.number(),
  label: z.string(),
  flags: z.array(trimmedOptimizelyFlag),
});

export type FlagAgeDetails = z.infer<typeof flagAgeDetails>;

export const flagAge = z.enum([
  "TWO_WEEKS_OR_LESS",
  "ONE_MONTH_OR_LESS",
  "THREE_MONTHS_OR_LESS",
  "SIX_MONTHS_OR_LESS",
  "ONE_YEAR_OR_LESS",
  "MORE_THAN_ONE_YEAR",
]);

export type FlagAge = z.infer<typeof flagAge>;

export const flagAgeDetailsMap = z.object({
  [flagAge.Enum.TWO_WEEKS_OR_LESS]: flagAgeDetails,
  [flagAge.Enum.ONE_MONTH_OR_LESS]: flagAgeDetails,
  [flagAge.Enum.THREE_MONTHS_OR_LESS]: flagAgeDetails,
  [flagAge.Enum.SIX_MONTHS_OR_LESS]: flagAgeDetails,
  [flagAge.Enum.ONE_YEAR_OR_LESS]: flagAgeDetails,
  [flagAge.Enum.MORE_THAN_ONE_YEAR]: flagAgeDetails,
});

export type FlagAgeDetailsMap = z.infer<typeof flagAgeDetailsMap>;
