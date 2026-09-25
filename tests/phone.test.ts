import { describe, expect, it } from "vitest";
import { caretAfterDigit, countDigitsBefore, isPunctuationOnlyDelete, isTypedOverflow, removeNeighborDigit } from "@/lib/phone-input";
import { formatPhone, isValidPhone, normalizePhone, parsePhoneInput, phoneOverflowMessage, toNationalDigits } from "@/lib/phone";

const QA_SENTINEL = "+15555550100";
const TYPED_OVERLONG = "52334242324444444";

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

  it("folds full-width IME digits to ASCII", () => {
    expect(formatPhone("４２３６３８３６６２")).toBe("(423) 638-3662");
  });
});

describe("parsePhoneInput", () => {
  it("accepts up to 10 digits and the exact 11-digit +1 form", () => {
    expect(parsePhoneInput("4236383662")).toEqual({ accepted: true, value: "(423) 638-3662" });
    expect(parsePhoneInput(QA_SENTINEL)).toEqual({ accepted: true, value: "(555) 555-0100" });
    expect(parsePhoneInput("")).toEqual({ accepted: true, value: "" });
  });

  it("rejects over-long candidates whole instead of slicing them to a different valid number", () => {
    expect(parsePhoneInput(TYPED_OVERLONG)).toEqual({ accepted: false, digitCount: 17 });
    expect(parsePhoneInput("25555550100")).toEqual({ accepted: false, digitCount: 11 });
    expect(parsePhoneInput("+1 (555) 555-01009")).toEqual({ accepted: false, digitCount: 12 });
    expect(parsePhoneInput("115555550100")).toEqual({ accepted: false, digitCount: 12 });
  });

  it("explains typed and pasted overflow differently", () => {
    expect(phoneOverflowMessage("typed", 11)).toMatch(/10 digits/);
    expect(phoneOverflowMessage("pasted", 17)).toMatch(/pasted number has 17 digits/);
  });
});

describe("toNationalDigits / normalizePhone / isValidPhone", () => {
  it("normalizes +1 input to exactly 10 digits", () => {
    expect(toNationalDigits(QA_SENTINEL)).toBe("5555550100");
    expect(normalizePhone(QA_SENTINEL)).toBe("5555550100");
    expect(isValidPhone(QA_SENTINEL)).toBe(true);
    expect(isValidPhone("(555) 555-0100")).toBe(true);
  });

  it("rejects malformed, ambiguous, and over-long numbers", () => {
    expect(isValidPhone("1555555010")).toBe(false); // +1 number missing a digit
    expect(isValidPhone("0555555010")).toBe(false);
    expect(isValidPhone("5550550100")).toBe(false); // exchange code starts with 0
    expect(isValidPhone("25555550100")).toBe(false); // 11 digits without a leading 1
    expect(isValidPhone("555555010012")).toBe(false);
    expect(isValidPhone(TYPED_OVERLONG)).toBe(false);
    expect(normalizePhone(TYPED_OVERLONG)).toBeNull();
    expect(isValidPhone("555555010")).toBe(false);
  });
});

describe("caret helpers", () => {
  it("counts digits before a caret and maps a digit count back to a formatted caret", () => {
    expect(countDigitsBefore("(423) 638-3662", 7)).toBe(4);
    expect(caretAfterDigit("(423) 638-3662", 4)).toBe(7);
    expect(caretAfterDigit("(423) 638-3662", 0)).toBe(0);
    expect(caretAfterDigit("(423) 638-3662", 99)).toBe(14);
  });

  it("deleting only punctuation removes the neighboring digit so Backspace/Delete never stall", () => {
    // "(423) 6" with Backspace on ")" leaves "(423 6", caret after "3".
    expect(removeNeighborDigit("(423 6", 4, false)).toEqual({ candidate: "426", caretDigits: 2 });
    // "(423) 6" with Delete on " " leaves "(423)6", caret after ")".
    expect(removeNeighborDigit("(423)6", 5, true)).toEqual({ candidate: "423", caretDigits: 3 });
  });
});

describe("typed edit guards", () => {
  it("only lets a typed 11th digit through when it extends a number that starts with 1", () => {
    expect(isTypedOverflow("(155) 555-5010", "(155) 555-50100")).toBe(false); // typed +1 sentinel
    expect(isTypedOverflow("(423) 638-3662", "1(423) 638-3662")).toBe(true); // 1 typed in front
    expect(isTypedOverflow("(423) 638-3662", "(423) 638-36629")).toBe(true);
    expect(isTypedOverflow("(423) 638-366", "(423) 638-3662")).toBe(false);
  });

  it("treats only a single-character Backspace/Delete of punctuation as punctuation-only", () => {
    expect(isPunctuationOnlyDelete("(423) 6", "(423 6", "deleteContentBackward")).toBe(true);
    expect(isPunctuationOnlyDelete("(423) 6", "(4236", "deleteContentBackward")).toBe(false); // selection ") "
    expect(isPunctuationOnlyDelete("(423) 6", "(423 6", "deleteByCut")).toBe(false);
  });
});
