import * as constants from "../../constants";
import { buildSlackMessage } from "../buildSlackMessage";

jest.mock("../inputs", () => ({
  Inputs: {
    projectId: "my-project-id",
  },
}));

describe("buildSlackMessage.ts", () => {
  it("should return a label for non-empty flag age", () => {
    constants.flagAgeDetailsMap["TWO_WEEKS_OR_LESS"].flags.push({
      key: "flag1",
      name: "Flag 1",
    });

    const result = buildSlackMessage();

    expect(result).toEqual([
      {
        text: {
          text: "Stale Flags Report 📝",
          type: "plain_text",
        },
        type: "header",
      },
      {
        text: {
          text: "*⚪️ Two Weeks or Less*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "<https://app.optimizely.com/v2/projects/my-project-id/flags/manage/flag1/rules/development|Flag 1>\n",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        text: {
          text: "*🟢 One Month or Less*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "No flags are this old 👴",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        text: {
          text: "*🟡 Three Months or Less*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "No flags are this old 👴",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        text: {
          text: "*🟠 Six Months or Less*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "No flags are this old 👴",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        text: {
          text: "*🔴 One Year or Less*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "No flags are this old 👴",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        type: "divider",
      },
      {
        text: {
          text: "*🚨 More Than a Year*",
          type: "mrkdwn",
        },
        type: "section",
      },
      {
        text: {
          text: "No flags are this old 👴",
          type: "mrkdwn",
        },
        type: "section",
      },
    ]);

    expect(result.at(-1)).not.toEqual({ type: "divider" });
  });
});
