import { FlagAgeDetailsMap } from "./types";

export const flagAgeDetailsMap: FlagAgeDetailsMap = {
  TWO_WEEKS_OR_LESS: {
    time: 60 * 60 * 24 * 14,
    label: "Hello There",
    flags: [],
  },
  ONE_MONTH_OR_LESS: {
    time: 60 * 60 * 24 * 30,
    label: "Hello There",
    flags: [],
  },
  THREE_MONTHS_OR_LESS: {
    time: 60 * 60 * 24 * 30 * 3,
    label: "Hello There",
    flags: [],
  },
  SIX_MONTHS_OR_LESS: {
    time: 60 * 60 * 24 * 30 * 6,
    label: "Hello There",
    flags: [],
  },
  ONE_YEAR_OR_LESS: {
    time: 60 * 60 * 24 * 365,
    label: "Hello There",
    flags: [],
  },
  MORE_THAN_ONE_YEAR: { time: -1, label: "Hello There", flags: [] },
};
