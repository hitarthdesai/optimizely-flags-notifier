import { OptimizelyFlag } from "../../types";
import { filterOutPermanentFlags } from "../filterOutPermanentFlags";

const mockPermanentFlag: OptimizelyFlag[] = [
  {
    name: "flag1",
    key: "flag1",
    updated_time: new Date().toString(),
    variable_definitions: {
      is_permanent: { default_value: "true" },
    },
  },
];

const mockNonPermanentFlag: OptimizelyFlag[] = [
  {
    name: "flag2",
    key: "flag2",
    updated_time: new Date().toString(),
    variable_definitions: {
      is_permanent: { default_value: "false" },
    },
  },
];

const mockFlagWithoutPermanentVariable: OptimizelyFlag[] = [
  {
    name: "flag3",
    key: "flag3",
    updated_time: new Date().toString(),
    variable_definitions: {},
  },
];

describe("filterOutPermanentFlags.ts", () => {
  it("should return an empty array if no flags are provided", () => {
    const filteredFlags = filterOutPermanentFlags([]);

    expect(filteredFlags).toHaveLength(0);
  });

  it("should remove flag with permanent value set to true", () => {
    const filteredFlags = filterOutPermanentFlags(mockPermanentFlag);

    expect(filteredFlags).toHaveLength(0);
  });

  it("should keep flag with permanent value set to false", () => {
    const filteredFlags = filterOutPermanentFlags(mockNonPermanentFlag);

    expect(filteredFlags).toHaveLength(1);
  });

  it("should keep flag with no permanent value set", () => {
    const filteredFlags = filterOutPermanentFlags(
      mockFlagWithoutPermanentVariable
    );

    expect(filteredFlags).toHaveLength(1);
  });
});
