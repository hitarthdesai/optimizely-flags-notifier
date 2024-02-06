import { KnownBlock } from "@slack/types";
import { Inputs } from "./inputs";

type SendSlackMessageInput = {
  blocks: KnownBlock[];
};

export async function sendSlackMessage({ blocks }: SendSlackMessageInput) {
  await fetch(Inputs.slackWebhookUrl, {
    method: "POST",
    body: JSON.stringify({
      channel: Inputs.channelId,
      blocks,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${Inputs.slackAppBotToken}`,
    },
  });
}
