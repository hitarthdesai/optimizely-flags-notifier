import { getAllFlags } from "../getAllFlags";

const mockFetch = jest.fn();
jest.mock("node-fetch", () => mockFetch);

jest.mock("../inputs", () => ({
  Inputs: {
    projectId: "my-project-id",
    optimizelyAuthToken: "my-auth-token",
  },
}));

describe("getAllFlags", () => {
  it("should fetch and parse flags correctly", async () => {
    await getAllFlags();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.optimizely.com/flags/v1/projects/my-project-id/flags?per_page=100",
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
