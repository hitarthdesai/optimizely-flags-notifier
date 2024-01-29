import { KnownBlock } from "@slack/types";

export async function sendSlackMessage(
  slack_webhook_url: string,
  channel_id: string,
  slack_app_bot_token: string,
  blocks: KnownBlock[]
) {
  const res = await fetch(slack_webhook_url, {
    method: "POST",
    body: JSON.stringify({
      channel: channel_id,
      blocks: blocks,
    }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${slack_app_bot_token}`,
    },
  });

  console.log(res.status);
}
