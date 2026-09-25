import { describe, expect, it } from "vitest";
import { formatPhone, isValidPhone, toNationalDigits } from "@/lib/phone";

const QA_SENTINEL = "+15555550100";

describe("formatPhone", () => {
  it("strips a +1 country code from the QA sentinel instead of dropping the last digit", () => {
    expect(formatPhone(QA_SENTINEL)).toBe("(555) 555-0100");
    expect(formatPhone("1 555 555 0100")).toBe("(555) 555-0100");
    expect(formatPhone("+1 (555) 555-0100")).toBe("(555) 555-0100");
  });

  it("keeps plain 10-digit numbers intact and formats partial input", () => {
    expect(formatPhone("4236383662")).toBe("(423) 638-3662");
    expect(formatPhone("(423) 638-3662")).toBe("(423) 638-3662");
    expect(formatPhone("423")).toBe("(423");
    expect(formatPhone("42363")).toBe("(423) 63");
    expect(formatPhone("")).toBe("");
  });

  it("never truncates over-long input", () => {
    expect(formatPhone("555555010012")).toBe("555555010012");
    expect(formatPhone("25555550100")).toBe("25555550100");
  });
});

describe("toNationalDigits / isValidPhone", () => {
  it("normalizes +1 input to exactly 10 digits", () => {
    expect(toNationalDigits(QA_SENTINEL)).toBe("5555550100");
    expect(isValidPhone(QA_SENTINEL)).toBe(true);
    expect(isValidPhone("(555) 555-0100")).toBe(true);
  });

  it("rejects malformed and ambiguous numbers", () => {
    expect(isValidPhone("1555555010")).toBe(false); // +1 number missing a digit
    expect(isValidPhone("0555555010")).toBe(false);
    expect(isValidPhone("5550550100")).toBe(false); // exchange code starts with 0
    expect(isValidPhone("25555550100")).toBe(false); // 11 digits without a leading 1
    expect(isValidPhone("555555010012")).toBe(false);
    expect(isValidPhone("555555010")).toBe(false);
  });
});
