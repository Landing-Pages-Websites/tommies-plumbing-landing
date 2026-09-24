const PHONE_DIGITS = 10;
const AREA_CODE_END = 3;
const PREFIX_END = 6;

/** Strip non-digits, cap at 10 digits, and format as (XXX) XXX-XXXX. */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_DIGITS);
  if (digits.length === 0) return "";
  if (digits.length <= AREA_CODE_END) return `(${digits}`;
  if (digits.length <= PREFIX_END) {
    return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END)}`;
  }
  return `(${digits.slice(0, AREA_CODE_END)}) ${digits.slice(AREA_CODE_END, PREFIX_END)}-${digits.slice(PREFIX_END)}`;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === PHONE_DIGITS;
}

export const PHONE_PATTERN = "\\(\\d{3}\\) \\d{3}-\\d{4}";
