import { isValidEmail } from "@/lib/email";
import type { LeadFieldName, LeadFormData, LeadFormValues } from "@/lib/lead-types";
import { isValidPhone, toNationalDigits } from "@/lib/phone";

export type LeadErrors = Partial<Record<LeadFieldName, string>>;

export const EMPTY_LEAD: LeadFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  homeowner: "",
};

export function validateLead(values: LeadFormValues): LeadErrors {
  const errors: LeadErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!isValidEmail(values.email)) errors.email = "Enter a valid email, like you@example.com.";
  if (!isValidPhone(values.phone)) errors.phone = "Enter a 10-digit US phone number.";
  if (!values.homeowner) errors.homeowner = "Choose Yes or No.";
  return errors;
}

/** Both answers submit; "no" is stored as disqualified. Phone is normalized to exactly 10 digits. */
export function toLeadData(values: LeadFormValues): LeadFormData {
  const homeowner = values.homeowner === "yes" ? "yes" : "no";
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    phone: toNationalDigits(values.phone),
    homeowner,
    qualificationStatus: homeowner === "yes" ? "qualified" : "disqualified",
  };
}
