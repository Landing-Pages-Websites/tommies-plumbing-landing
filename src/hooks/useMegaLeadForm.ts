"use client";

import { useCallback, useEffect } from "react";
import { getSessionId, getVisitorId, initAttribution } from "@/lib/attribution";
import { isValidEmail } from "@/lib/email";
import type { LeadFormData } from "@/lib/lead-types";
import { MEGA_CONFIG, hasLiveLeadRouting } from "@/lib/mega-config";
import { isValidPhone } from "@/lib/phone";

interface SubmissionResponse {
  ok: boolean;
  id?: string;
}

interface UseMegaLeadFormReturn {
  submit: (lead: LeadFormData) => Promise<SubmissionResponse>;
}

/** Hook-level validation — defense in depth behind the UI checks. */
function assertValidLead(lead: LeadFormData): void {
  if (!lead.firstName.trim() || !lead.lastName.trim()) {
    throw new Error("First and last name are required");
  }
  if (!isValidEmail(lead.email)) throw new Error("Enter a valid email address");
  if (!isValidPhone(lead.phone)) throw new Error("Phone must be exactly 10 digits");
}

function buildPayload(lead: LeadFormData): Record<string, unknown> {
  const attribution = initAttribution();
  return {
    customer_id: MEGA_CONFIG.CUSTOMER_ID,
    site_id: MEGA_CONFIG.SITE_ID,
    source_provider: MEGA_CONFIG.SOURCE_PROVIDER,
    form_data: { ...lead, phone: lead.phone.replace(/\D/g, "") },
    url: window.location.href,
    referrer_url: document.referrer || null,
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    ...attribution,
  };
}

const SUBMIT_TIMEOUT_MS = 15000;

async function parseBody(response: Response): Promise<Partial<SubmissionResponse> | null> {
  try {
    return (await response.json()) as Partial<SubmissionResponse>;
  } catch {
    return null;
  }
}

async function readResponse(response: Response): Promise<SubmissionResponse> {
  const body = await parseBody(response);
  // A 2xx with an empty/non-JSON body still means the lead was accepted,
  // but an explicit `ok: false` is a rejection and must not count as a lead.
  if (body?.ok === false) throw new Error("Lead submission was rejected by the server");
  return { ...body, ok: true };
}

async function postLead(lead: LeadFormData): Promise<SubmissionResponse> {
  if (!hasLiveLeadRouting()) {
    throw new Error("Lead routing is not configured yet (site_id pending registration)");
  }
  const response = await fetch(MEGA_CONFIG.ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildPayload(lead)),
    signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Lead submission failed with HTTP ${response.status}`);
  return readResponse(response);
}

export function useMegaLeadForm(): UseMegaLeadFormReturn {
  useEffect(() => {
    initAttribution();
  }, []);

  const submit = useCallback(async (lead: LeadFormData): Promise<SubmissionResponse> => {
    assertValidLead(lead);
    return postLead(lead);
  }, []);

  return { submit };
}
