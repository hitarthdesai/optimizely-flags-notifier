import { type KnownBlock } from "@slack/types";
import { flagAgeDetailsMap } from "../constants";
import { Inputs } from "./inputs";

/**
 * Builds a Slack message from a list of flags grouped by age
 *
 * @returns Slack message as blocks
 */
export function buildSlackMessage(): KnownBlock[] {
  const blocks: KnownBlock[] = [];

  blocks.push({
    type: "header",
    text: {
      type: "plain_text",
      text: "Stale Flags Report 📝",
    },
  });
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*🗓️ Present*`,
    },
  });

  for (const details of Object.values(flagAgeDetailsMap)) {
    if (details.flags.length === 0) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "No flags in this range",
        },
      });
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${details.label}*`,
        },
      });

      continue;
    }

    const flag_names = details.flags
      .map(
        ({ key, name }) =>
          `<https://app.optimizely.com/v2/projects/${Inputs.projectId}/flags/manage/${key}/rules/development|${name}>`
      )
      .join("\n");

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${flag_names}\n`,
      },
    });
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${details.label}*`,
      },
    });
  }

  blocks.push({ type: "divider" });

  return blocks;
}
