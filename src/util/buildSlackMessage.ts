/* eslint-disable @typescript-eslint/no-explicit-any */
import { type KnownBlock } from "@slack/types";
import { FlagAge } from "..";

type BuildSlackMessageInput = {
  project_id: string;
  flags_by_age: Map<FlagAge, any>;
};

/**
 * Builds a Slack message from a list of flags grouped by age
 *
 * @param param0 Project Id and flags grouped by age
 * @returns Slack message as blocks
 */
export function buildSlackMessage({
  project_id,
  flags_by_age,
}: BuildSlackMessageInput): KnownBlock[] {
  const blocks: KnownBlock[] = [];

  flags_by_age.forEach((flags: any[]) => {
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
