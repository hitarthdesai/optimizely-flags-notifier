import { getFlagAgeFromLastModifiedDate } from "../getFlagAgeFromLastModifiedDate";

describe("getFlagAgeFromLastModifiedDate.ts", () => {
  it("should return `TWO_WEEKS_OR_LESS`", () => {
    const timeInput = new Date();
    timeInput.setHours(timeInput.getHours() - 1);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("TWO_WEEKS_OR_LESS");
  });

  it("should return `ONE_MONTH_OR_LESS`", () => {
    const timeInput = new Date();
    timeInput.setDate(timeInput.getDate() - 17);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("ONE_MONTH_OR_LESS");
  });

  it("should return `THREE_MONTHS_OR_LESS`", () => {
    const timeInput = new Date();
    timeInput.setMonth(timeInput.getMonth() - 2);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("THREE_MONTHS_OR_LESS");
  });

  it("should return `SIX_MONTHS_OR_LESS`", () => {
    const timeInput = new Date();
    timeInput.setMonth(timeInput.getMonth() - 5);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("SIX_MONTHS_OR_LESS");
  });

  it("should return `ONE_YEAR_OR_LESS`", () => {
    const timeInput = new Date();
    timeInput.setMonth(timeInput.getMonth() - 10);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("ONE_YEAR_OR_LESS");
  });

  it("should return `MORE_THAN_ONE_YEAR`", () => {
    const timeInput = new Date();
    timeInput.setFullYear(timeInput.getFullYear() - 2);
    const updatedTime = timeInput.toISOString();

    const result = getFlagAgeFromLastModifiedDate(updatedTime);
    expect(result).toBe("MORE_THAN_ONE_YEAR");
  });
});
