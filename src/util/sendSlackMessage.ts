import { KnownBlock } from "@slack/types";
import fetch from "node-fetch";
import { Inputs } from "./inputs";

type SendSlackMessageInput = {
  blocks: KnownBlock[];
};

export async function sendSlackMessage({ blocks }: SendSlackMessageInput) {
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    body: JSON.stringify({
      blocks,
      channel: Inputs.channelId,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${Inputs.slackAppBotToken}`,
    },
  });
}
