"use client";

import { useRef, useState, type FormEvent, type RefObject } from "react";
import { useLeadSubmission } from "@/hooks/useLeadSubmission";
import type { FormStatus, LeadFieldName, LeadFormValues } from "@/lib/lead-types";
import { EMPTY_LEAD, validateLead, type LeadErrors } from "@/lib/lead-validation";

interface UseLeadFormReturn {
  formRef: RefObject<HTMLFormElement | null>;
  values: LeadFormValues;
  errors: LeadErrors;
  status: FormStatus;
  setField: (name: LeadFieldName, value: string) => void;
  handleClick: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  retry: () => void;
}

function focusFirstInvalid(form: HTMLFormElement | null, errors: LeadErrors): void {
  const first = Object.keys(errors)[0];
  if (!form || !first) return;
  form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
}

export function useLeadForm(formId: string): UseLeadFormReturn {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<LeadFormValues>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors | null>(null);
  const { status, submitLead, retry } = useLeadSubmission(formId);

  const setField = (name: LeadFieldName, value: string): void => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors) setErrors(validateLead(next));
  };

  // Validate first; only a clean form reaches the native submit event via requestSubmit().
  const handleClick = (): void => {
    const found = validateLead(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return focusFirstInvalid(formRef.current, found);
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void submitLead(values);
  };

  return { formRef, values, errors: errors ?? {}, status, setField, handleClick, handleSubmit, retry };
}
