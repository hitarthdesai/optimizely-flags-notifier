const mockFetch = jest.fn();
jest.mock("node-fetch", () => mockFetch);

import { getAllFlags } from "../getAllFlags";
import { Inputs } from "../inputs";

Inputs.projectId = "my-project-id";
Inputs.optimizelyAuthToken = "my-auth-token";

describe("getAllFlags.ts", () => {
  it("should fetch and parse flags correctly", async () => {
    await getAllFlags();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.optimizely.com/flags/v1/projects/my-project-id/flags?per_page=100&archived=false",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer my-auth-token",
        },
      }
    );
  });
});
