import * as core from "@actions/core";
import { Inputs } from "../inputs";

const originalEnv = { ...process.env };

describe("Inputs", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    Inputs._resetInstance();
    jest.restoreAllMocks();
  });

  describe("parseInputs", () => {
    it("should parse inputs from getInput correctly", () => {
      const mockGetInput = jest.spyOn(core, "getInput");
      mockGetInput.mockImplementation((name: string) => {
        switch (name) {
          case "optimizely_project_id":
            return "my-project-id";
          case "optimizely_auth_token":
            return "my-auth-token";
          case "slack_channel_id":
            return "my-channel-id";
          case "slack_app_bot_token":
            return "my-bot-token";
          default:
            return "";
        }
      });

      Inputs.parseInputs();

      expect(Inputs.projectId).toBe("my-project-id");
      expect(Inputs.optimizelyAuthToken).toBe("my-auth-token");
      expect(Inputs.channelId).toBe("my-channel-id");
      expect(Inputs.slackAppBotToken).toBe("my-bot-token");
    });

    it("should parse inputs from process.env correctly", () => {
      process.env.OPTIMIZELY_PROJECT_ID = "my-project-id";
      process.env.OPTIMIZELY_AUTH_TOKEN = "my-auth-token";
      process.env.SLACK_CHANNEL_ID = "my-channel-id";
      process.env.SLACK_APP_BOT_TOKEN = "my-bot-token";

      Inputs.parseInputs();

      expect(Inputs.projectId).toBe("my-project-id");
      expect(Inputs.optimizelyAuthToken).toBe("my-auth-token");
      expect(Inputs.channelId).toBe("my-channel-id");
      expect(Inputs.slackAppBotToken).toBe("my-bot-token");
    });

    it("should throw an error if required inputs are missing", () => {
      process.env.INPUT_PROJECT_ID = "my-project-id";
      process.env.INPUT_OPTIMIZELY_AUTH_TOKEN = "my-auth-token";

      expect(() => Inputs.parseInputs()).toThrow();
    });
  });
});
