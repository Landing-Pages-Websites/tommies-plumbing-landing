"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { fireConversionEvents } from "@/lib/conversion-events";
import type { FormStatus, LeadFormValues } from "@/lib/lead-types";
import { toLeadData, validateLead } from "@/lib/lead-validation";

interface UseLeadSubmissionReturn {
  status: FormStatus;
  submitLead: (values: LeadFormValues) => Promise<void>;
  retry: () => void;
}

/** One submission per form: synchronous in-flight guard, conversion events only on API success. */
export function useLeadSubmission(formId: string): UseLeadSubmissionReturn {
  const inFlightRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const { submit } = useMegaLeadForm();

  const submitLead = async (values: LeadFormValues): Promise<void> => {
    if (inFlightRef.current) return;
    if (Object.keys(validateLead(values)).length > 0) return;
    inFlightRef.current = true;
    setStatus("submitting");
    const lead = toLeadData(values);
    try {
      await submit(lead);
      fireConversionEvents(formId, lead);
      setStatus("success");
    } catch {
      // No conversion fires on failure; the error state offers a retry or the phone line.
      inFlightRef.current = false;
      setStatus("error");
    }
  };

  const retry = (): void => setStatus("idle");

  return { status, submitLead, retry };
}
