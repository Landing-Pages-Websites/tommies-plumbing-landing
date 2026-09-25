import { extractDigits } from "@/lib/phone";

const DIGIT = /\d/;
const NATIONAL_DIGITS = 10;
const SINGLE_CHARACTER_DELETES = new Set(["deleteContentBackward", "deleteContentForward"]);

export function countDigitsBefore(value: string, caret: number): number {
  return extractDigits(value.slice(0, caret)).length;
}

/** Caret index just after the nth digit of a formatted value, so re-formatting never jumps the caret. */
export function caretAfterDigit(formatted: string, digitCount: number): number {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (!DIGIT.test(formatted[index])) continue;
    seen += 1;
    if (seen === digitCount) return index + 1;
  }
  return formatted.length;
}

/**
 * Backspace/Delete that removed only punctuation — "(423)| 6" → "(423 6" — would be undone by
 * re-formatting, so it removes the neighboring digit instead.
 */
export function removeNeighborDigit(raw: string, caret: number, forward: boolean): { candidate: string; caretDigits: number } {
  const digits = extractDigits(raw);
  const before = countDigitsBefore(raw, caret);
  const index = forward ? before : before - 1;
  if (index < 0 || index >= digits.length) return { candidate: digits, caretDigits: before };
  return { candidate: digits.slice(0, index) + digits.slice(index + 1), caretDigits: index };
}

/** A lone Backspace/Delete that removed one punctuation character (not a cut or a selected range). */
export function isPunctuationOnlyDelete(previous: string, raw: string, inputType: string): boolean {
  if (!SINGLE_CHARACTER_DELETES.has(inputType) || previous.length - raw.length !== 1) return false;
  return extractDigits(raw) === extractDigits(previous);
}

/**
 * A keystroke past 10 digits is only the +1 form when it extends a number that already starts
 * with 1; a 1 typed in front of a complete number would otherwise vanish as a "country code".
 */
export function isTypedOverflow(previous: string, candidate: string): boolean {
  const before = extractDigits(previous);
  const after = extractDigits(candidate);
  if (after.length <= NATIONAL_DIGITS || after.length <= before.length) return false;
  return !(before.startsWith("1") && after.startsWith(before));
}
