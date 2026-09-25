const PHONE_DIGITS = 10;
const AREA_CODE_END = 3;
const PREFIX_END = 6;
const US_COUNTRY_CODE = "1";
// NANP area and exchange codes never start with 0 or 1, so a leading 1 on 10 digits is a truncated +1 number.
const NANP_NATIONAL = /^[2-9]\d{2}[2-9]\d{6}$/;

export type PhoneEditSource = "typed" | "pasted" | "replaced";

export type PhoneInputResult = { accepted: true; value: string } | { accepted: false; digitCount: number };

/** ASCII digits only; NFKC first folds full-width IME digits (５) to ASCII. */
export function extractDigits(value: string): string {
  return value.normalize("NFKC").replace(/\D/g, "");
}

/**
 * Digits only, with a +1 country code removed ONLY when there are exactly 11 digits
 * and the first is 1. Never truncates: extra digits stay so callers can reject them.
 */
export function toNationalDigits(value: string): string {
  const digits = extractDigits(value);
  const hasCountryCode = digits.length === PHONE_DIGITS + 1 && digits.startsWith(US_COUNTRY_CODE);
  return hasCountryCode ? digits.slice(US_COUNTRY_CODE.length) : digits;
}

/** Format as (XXX) XXX-XXXX while typing. Only called on input that parsePhoneInput accepted. */
export function formatPhone(value: string): string {
  const digits = toNationalDigits(value);
  if (digits.length === 0) return "";
  if (digits.length <= AREA_CODE_END) return `(${digits}`;
  if (digits.length <= PREFIX_END) {
    return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END)}`;
  }
  return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END, PREFIX_END)}-${digits.slice(PREFIX_END)}`;
}

/**
 * Gate for every edit to the phone field. More than 10 national digits (anything but the
 * exact 11-digit +1 form) rejects the whole candidate — it is never sliced to a different number.
 */
export function parsePhoneInput(candidate: string): PhoneInputResult {
  const national = toNationalDigits(candidate);
  if (national.length > PHONE_DIGITS) return { accepted: false, digitCount: extractDigits(candidate).length };
  return { accepted: true, value: formatPhone(national) };
}

export function phoneOverflowMessage(source: PhoneEditSource, digitCount: number): string {
  if (source === "typed") {
    return "Phone numbers are 10 digits, so the extra digit wasn't added. Check the number and re-enter it.";
  }
  const origin = source === "pasted" ? "pasted number" : "number";
  return `That ${origin} has ${digitCount} digits, so it wasn't added. Enter a 10-digit US phone number.`;
}

/** Exactly 10 valid NANP digits, or null. The only phone value allowed into a lead payload. */
export function normalizePhone(value: string): string | null {
  const digits = toNationalDigits(value);
  return NANP_NATIONAL.test(digits) ? digits : null;
}

export function isValidPhone(value: string): boolean {
  return normalizePhone(value) !== null;
}

export const PHONE_PATTERN = "\\(\\d{3}\\) \\d{3}-\\d{4}";
