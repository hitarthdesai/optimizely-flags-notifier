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
