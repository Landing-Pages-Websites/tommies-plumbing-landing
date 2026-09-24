import { hasLiveLeadRouting } from "@/lib/mega-config";
import type { LeadFormData } from "@/lib/lead-types";

interface MegaTagApi {
  trackEvent: (event: string, data: Record<string, string | boolean>) => void;
}

type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  MegaTag?: MegaTagApi;
};

const FORM_PROVIDER = "tommies-plumbing-landing";

function trackMegaTagSubmit(w: TrackingWindow, formId: string, lead: LeadFormData): void {
  if (!w.MegaTag?.trackEvent) return;
  try {
    w.MegaTag.trackEvent("form_submit", { element: formId, ...lead });
  } catch {
    // The dataLayer push below still records the conversion if MegaTag throws.
  }
}

/**
 * Fire conversion events after the lead API confirms success.
 * Fails closed: nothing fires while MEGA site identifiers are still placeholders.
 */
export function fireConversionEvents(formId: string, lead: LeadFormData): void {
  if (typeof window === "undefined" || !hasLiveLeadRouting()) return;
  const w = window as TrackingWindow;
  trackMegaTagSubmit(w, formId, lead);
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "form_submission",
    form_id: formId,
    form_provider: FORM_PROVIDER,
    lead_qualification: lead.qualificationStatus,
  });
}
