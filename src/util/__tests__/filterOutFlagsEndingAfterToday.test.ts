import { OptimizelyFlag } from "../../types";
import { filterOutFlagsEndingAfterToday } from "../filterOutFlagsEndingAfterToday";
import { Inputs } from "../inputs";

const dateToOptimizelyString = (date: Date) =>
  date
    .toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .replace(/\//g, ",");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const mockFlagEndingTomorrow: OptimizelyFlag[] = [
  {
    name: "flag1",
    key: "flag1",
    updated_time: today.toString(),
    variable_definitions: {
      end_date: { default_value: dateToOptimizelyString(tomorrow) },
    },
  },
];

const mockFlagEndingYesterday: OptimizelyFlag[] = [
  {
    name: "flag2",
    key: "flag2",
    updated_time: today.toString(),
    variable_definitions: {
      end_date: { default_value: dateToOptimizelyString(yesterday) },
    },
  },
];

const mockFlagWithoutEndDate: OptimizelyFlag[] = [
  {
    name: "flag3",
    key: "flag3",
    updated_time: new Date().toString(),
    variable_definitions: {},
  },
];

describe("filterOutFlagsEndingAfterToday.ts", () => {
  beforeEach(() => {
    Inputs.flagEndDateVariableName = "end_date";
  });

  it("should return an empty array if no flags are provided", () => {
    const filteredFlags = filterOutFlagsEndingAfterToday([]);

    expect(filteredFlags).toHaveLength(0);
  });

  it("should remove flags that are ending after today", () => {
    const filteredFlags = filterOutFlagsEndingAfterToday(
      mockFlagEndingTomorrow
    );

    expect(filteredFlags).toHaveLength(0);
  });

  it("should keep flags that are ending before today", () => {
    const filteredFlags = filterOutFlagsEndingAfterToday(
      mockFlagEndingYesterday
    );

    expect(filteredFlags).toHaveLength(1);
  });

  it("should keep flags with no end date", () => {
    const filteredFlags = filterOutFlagsEndingAfterToday(
      mockFlagWithoutEndDate
    );

    expect(filteredFlags).toHaveLength(1);
  });
});
