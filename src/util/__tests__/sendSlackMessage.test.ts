const mockFetch = jest.fn();
jest.mock("node-fetch", () => mockFetch);

import { KnownBlock } from "@slack/types";
import { sendSlackMessage } from "../sendSlackMessage";

jest.mock("../inputs", () => ({
  Inputs: {
    channelId: "my-channel-id",
    slackAppBotToken: "my-slack-token",
  },
}));

const mockBlocks: KnownBlock[] = [
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
];

describe("sendSlackMessage.ts", () => {
  it("should fetch and parse flags correctly", async () => {
    await sendSlackMessage({
      blocks: mockBlocks,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://slack.com/api/chat.postMessage",
      {
        method: "POST",
        body: JSON.stringify({
          blocks: mockBlocks,
          channel: "my-channel-id",
        }),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer my-slack-token`,
        },
      }
    );
  });
});
