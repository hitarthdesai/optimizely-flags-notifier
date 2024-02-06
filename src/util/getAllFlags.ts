import { OptimizelyFlag, optimizelyFlags } from "../types";
import { Inputs } from "./inputs";

/**
 * Uses Optimizely's REST API to fetch all flags inside the project
 *
 * @returns List of all flags in the project
 */
export async function getAllFlags(): Promise<OptimizelyFlag[]> {
  try {
    const res = await fetch(
      `https://api.optimizely.com/flags/v1/projects/${Inputs.projectId}/flags?per_page=100`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${Inputs.optimizelyAuthToken}`,
        },
      }
    );
    return optimizelyFlags.parse((await res.json()).items);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e);
    return [];
  }
}
