// MEGA lead-routing identifiers. SITE_ID is filled by the controller after
// `mega site-tracking enable` (landing-page-deploy Step 2, flow B), together with
// the siteKey in MEGA_TAG_CONFIG (src/app/layout.tsx).
export const MEGA_CONFIG = {
  CUSTOMER_ID: "0901d69a-a505-4374-a98e-269b96a9d4c3",
  SITE_ID: "PLACEHOLDER_SITE_ID",
  SOURCE_PROVIDER: "customer-landing-tommies-plumbing",
  ENDPOINT: "https://analytics.gomega.ai/submission/submit",
} as const;

export const MEGA_ENDPOINTS = {
  OPTIMIZER_SCRIPT: "https://cdn.gomega.ai/scripts/optimizer.min.js",
  OPTIMIZER_API: "https://optimizer.gomega.ai",
  TRACKING_API: "https://events-api.gomega.ai",
} as const;

const PLACEHOLDER_MARKERS = /PLACEHOLDER|x{3,}/i;

/** True when an identifier is still a pre-registration placeholder. */
export function isPlaceholderId(value: string): boolean {
  return value.length === 0 || PLACEHOLDER_MARKERS.test(value);
}

export function hasLiveLeadRouting(): boolean {
  return !isPlaceholderId(MEGA_CONFIG.SITE_ID);
}
