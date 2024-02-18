import { FlagAgeDetailsMap } from "./types";

export const flagAgeDetailsMap: FlagAgeDetailsMap = {
  TWO_WEEKS_OR_LESS: {
    time: 60 * 60 * 24 * 14,
    label: "⚪️ Two Weeks or Less",
    flags: [],
  },
  ONE_MONTH_OR_LESS: {
    time: 60 * 60 * 24 * 30,
    label: "🟢 One Month or Less",
    flags: [],
  },
  THREE_MONTHS_OR_LESS: {
    time: 60 * 60 * 24 * 30 * 3,
    label: "🟡 Three Months or Less",
    flags: [],
  },
  SIX_MONTHS_OR_LESS: {
    time: 60 * 60 * 24 * 30 * 6,
    label: "🟠 Six Months or Less",
    flags: [],
  },
  ONE_YEAR_OR_LESS: {
    time: 60 * 60 * 24 * 365,
    label: "🔴 One Year or Less",
    flags: [],
  },
  MORE_THAN_ONE_YEAR: {
    time: -1,
    label: "🚨 More Than a Year",
    flags: [],
  },
} as const;
