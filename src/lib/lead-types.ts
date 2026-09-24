export type HomeownerAnswer = "yes" | "no";
export type QualificationStatus = "qualified" | "disqualified";

/** form_data keys — camelCase, each field exactly once. */
export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeowner: HomeownerAnswer;
  qualificationStatus: QualificationStatus;
}

export interface LeadFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeowner: HomeownerAnswer | "";
}

export type LeadFieldName = keyof LeadFormValues;

export type FormStatus = "idle" | "submitting" | "success" | "error";
