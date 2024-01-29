type GetAllFlagsInput = {
  optimizely_project_id: string;
  optimizely_auth_token: string;
};

/**
 * Uses Optimizely's REST API to fetch all flags inside the project
 *
 * @param param0 Omptimizely project ID and auth token
 * @returns List of all flags in the project
 */
export async function getAllFlags({
  optimizely_project_id,
  optimizely_auth_token,
}: GetAllFlagsInput) {
  try {
    const res = await fetch(
      `https://api.optimizely.com/flags/v1/projects/${optimizely_project_id}/flags?per_page=100`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${optimizely_auth_token}`,
        },
      }
    );
    return (await res.json()).items;
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e);
    return [];
  }
}
