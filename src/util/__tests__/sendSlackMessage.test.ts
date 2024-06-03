const mockFetch = jest.fn();
jest.mock("node-fetch", () => mockFetch);

import { type KnownBlock } from "@slack/types";
import { Inputs } from "../inputs";
import { sendSlackMessage } from "../sendSlackMessage";

export const mockBlocks: KnownBlock[] = [
  {
    text: {
      text: "Stale Flags Report 📝",
      type: "plain_text",
    },
    type: "header",
  },
  {
    text: {
      text: "*🗓️ Present*",
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
    text: {
      text: "*⚪️ Two Weeks*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "No flags in this range",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "*🟢 One Month*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "No flags in this range",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "*🟡 Three Months*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "No flags in this range",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "*🟠 Six Months*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "No flags in this range",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "*🔴 One Year*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "No flags in this range",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    text: {
      text: "*🦖 Jurassic Age*",
      type: "mrkdwn",
    },
    type: "section",
  },
  {
    type: "divider",
  },
];

Inputs.channelId = "my-channel-id";
Inputs.slackAppBotToken = "my-slack-token";

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
