import { KnownBlock } from "@slack/types";

type SendSlackMessageInput = {
  slack_webhook_url: string;
  channel_id: string;
  slack_app_bot_token: string;
  blocks: KnownBlock[];
};

export async function sendSlackMessage({
  slack_webhook_url,
  channel_id,
  slack_app_bot_token,
  blocks,
}: SendSlackMessageInput) {
  await fetch(slack_webhook_url, {
    method: "POST",
    body: JSON.stringify({
      channel: channel_id,
      blocks,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${slack_app_bot_token}`,
    },
  });
}
