"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { fireConversionEvents } from "@/lib/conversion-events";
import { acquireLeadLock, releaseLeadLock } from "@/lib/lead-submission-lock";
import type { FormStatus, LeadFormValues } from "@/lib/lead-types";
import { toLeadData, validateLead } from "@/lib/lead-validation";

interface UseLeadSubmissionReturn {
  status: FormStatus;
  submitLead: (values: LeadFormValues) => Promise<void>;
  retry: () => void;
}

/**
 * One lead request at a time across every form on the page (shared lock), and at most
 * one accepted lead per form. Conversion events fire only after the API confirms `ok: true`.
 */
export function useLeadSubmission(formId: string): UseLeadSubmissionReturn {
  const sentRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const { submit } = useMegaLeadForm();

  const submitLead = async (values: LeadFormValues): Promise<void> => {
    if (sentRef.current || Object.keys(validateLead(values)).length > 0) return;
    if (!acquireLeadLock()) return;
    setStatus("submitting");
    const lead = toLeadData(values);
    try {
      const result = await submit(lead);
      if (result.ok !== true) throw new Error("Lead submission was not confirmed");
      sentRef.current = true;
      fireConversionEvents(formId, lead);
      setStatus("success");
    } catch {
      // No conversion fires on failure; the error state offers a retry or the phone line.
      setStatus("error");
    } finally {
      releaseLeadLock();
    }
  };

  const retry = (): void => setStatus("idle");

  return { status, submitLead, retry };
}
