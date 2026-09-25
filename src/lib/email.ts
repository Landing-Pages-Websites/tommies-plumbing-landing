// Fleet-standard RFC-5322-lite email validation (landing-page-forms Hard Rule #4b).
// EMAIL_PATTERN is un-anchored for the HTML pattern attribute; EMAIL_REGEX is anchored for JS.
export const EMAIL_PATTERN = "[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}";
const EMAIL_REGEX = new RegExp(`^${EMAIL_PATTERN}$`);

export const isValidEmail = (value: unknown): boolean =>
  typeof value === "string" && EMAIL_REGEX.test(value.trim());
