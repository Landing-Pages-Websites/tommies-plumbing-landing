"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent, type RefObject } from "react";
import { useLeadSubmission } from "@/hooks/useLeadSubmission";
import type { FormStatus, LeadFieldName, LeadFormValues } from "@/lib/lead-types";
import { EMPTY_LEAD, validateLead, type LeadErrors } from "@/lib/lead-validation";

interface UseLeadFormReturn {
  formRef: RefObject<HTMLFormElement | null>;
  values: LeadFormValues;
  errors: LeadErrors;
  status: FormStatus;
  setField: (name: LeadFieldName, value: string) => void;
  rejectPhone: (message: string) => void;
  handleClick: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLFormElement>) => void;
  blockNativeSubmit: (event: FormEvent<HTMLFormElement>) => void;
  retry: () => void;
}

function focusFirstInvalid(form: HTMLFormElement | null, errors: LeadErrors): void {
  const first = Object.keys(errors)[0];
  if (!form || !first) return;
  form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
}

/**
 * The lead flow never dispatches a native submit event: the Mega optimizer's capture-phase
 * `submit` listener would beacon form_submit before the API answers, even on failure.
 * Clicks and Enter both call the validate-first handler, which posts via fetch directly.
 */
export function useLeadForm(formId: string): UseLeadFormReturn {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<LeadFormValues>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors | null>(null);
  // A rejected (over-long) phone edit: shown at once, blocks submit, cleared by the next real phone edit.
  const [phoneNotice, setPhoneNotice] = useState<string | null>(null);
  const { status, submitLead, retry } = useLeadSubmission(formId);

  const setField = (name: LeadFieldName, value: string): void => {
    const next = { ...values, [name]: value };
    const notice = name === "phone" ? null : phoneNotice;
    setValues(next);
    setPhoneNotice(notice);
    if (errors) setErrors(validateLead(next, notice));
  };

  const rejectPhone = (message: string): void => setPhoneNotice(message);

  const handleClick = (): void => {
    const found = validateLead(values, phoneNotice);
    setErrors(found);
    if (Object.keys(found).length > 0) return focusFirstInvalid(formRef.current, found);
    void submitLead(values);
  };

  // Enter in a field would trigger implicit (native) submission; cancel it at keydown instead.
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>): void => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    if (!(event.target instanceof HTMLInputElement)) return;
    event.preventDefault();
    handleClick();
  };

  // Defensive only: nothing in the flow should reach here, and it never submits the lead.
  const blockNativeSubmit = (event: FormEvent<HTMLFormElement>): void => event.preventDefault();

  const shownErrors = phoneNotice ? { ...errors, phone: phoneNotice } : errors ?? {};
  return { formRef, values, errors: shownErrors, status, setField, rejectPhone, handleClick, handleKeyDown, blockNativeSubmit, retry };
}
