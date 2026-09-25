const PHONE_DIGITS = 10;
const AREA_CODE_END = 3;
const PREFIX_END = 6;
const US_COUNTRY_CODE = "1";
// NANP area and exchange codes never start with 0 or 1, so a leading 1 on 10 digits is a truncated +1 number.
const NANP_NATIONAL = /^[2-9]\d{2}[2-9]\d{6}$/;

/**
 * Digits only, with a +1 country code removed ONLY when there are exactly 11 digits
 * and the first is 1. Never truncates: extra digits stay so validation can reject them.
 */
export function toNationalDigits(value: string): string {
  const digits = value.replace(/\D/g, "");
  const hasCountryCode = digits.length === PHONE_DIGITS + 1 && digits.startsWith(US_COUNTRY_CODE);
  return hasCountryCode ? digits.slice(US_COUNTRY_CODE.length) : digits;
}

/** Format as (XXX) XXX-XXXX while typing; over-long input is shown as raw digits, never cut. */
export function formatPhone(value: string): string {
  const digits = toNationalDigits(value);
  if (digits.length === 0) return "";
  if (digits.length > PHONE_DIGITS) return digits;
  if (digits.length <= AREA_CODE_END) return `(${digits}`;
  if (digits.length <= PREFIX_END) {
    return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END)}`;
  }
  return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END, PREFIX_END)}-${digits.slice(PREFIX_END)}`;
}

export function isValidPhone(value: string): boolean {
  const digits = toNationalDigits(value);
  return NANP_NATIONAL.test(digits);
}

export const PHONE_PATTERN = "\\(\\d{3}\\) \\d{3}-\\d{4}";
