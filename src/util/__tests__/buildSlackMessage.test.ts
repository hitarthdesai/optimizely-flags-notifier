import * as constants from "../../constants";
import { buildSlackMessage } from "../buildSlackMessage";
import { Inputs } from "../inputs";
import { mockBlocks as expectedBlocks } from "./sendSlackMessage.test";

Inputs.projectId = "my-project-id";

describe("buildSlackMessage.ts", () => {
  it("should return a label for non-empty flag age", () => {
    constants.flagAgeDetailsMap["TWO_WEEKS_OR_LESS"].flags.push({
      key: "flag1",
      name: "Flag 1",
    });

    const result = buildSlackMessage();

    expect(result).toEqual(expectedBlocks);

    expect(result.at(-1)).toEqual({ type: "divider" });
  });
});
