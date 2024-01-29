import { type KnownBlock } from "@slack/types";
import { FlagAge } from "..";

export function buildSlackMessage(
  project_id: string,
  flags_map: Map<FlagAge, any>
): KnownBlock[] {
  const blocks: KnownBlock[] = [];

  flags_map.forEach((flags: Array<any>, _) => {
    if (flags === undefined || flags.length === 0) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "No flags are this old 🎉",
        },
      });
      blocks.push({ type: "divider" });
    }

    const flag_names = flags
      .map(
        ({ key, name }) =>
          `<https://app.optimizely.com/v2/projects/${project_id}/flags/manage/${key}/rules/development|${name}>`
      )
      .join(", ");

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${flag_names}\n`,
      },
    });
    blocks.push({ type: "divider" });
  });

  return blocks;
}
