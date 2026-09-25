const STORAGE_KEYS = {
  VISITOR_ID: "_mega_vid",
  SESSION_ID: "_mega_sid",
  ATTRIBUTION: "_mega_attr",
} as const;

const TRACKING_PARAMS = ["utm_source", "gclid", "fbclid", "gbraid", "wbraid"];

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  gclid: null,
  gbraid: null,
  wbraid: null,
  fbclid: null,
  fbp: null,
  fbc: null,
};

function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

function getCookie(name: string): string | null {
  const parts = `; ${document.cookie}`.split(`; ${name}=`);
  if (parts.length !== 2) return null;
  return parts.pop()?.split(";").shift() || null;
}

function getOrCreateId(getStorage: () => Storage, key: string, prefix: string): string {
  try {
    const storage = getStorage();
    const existing = storage.getItem(key);
    if (existing) return existing;
    const created = generateId(prefix);
    storage.setItem(key, created);
    return created;
  } catch {
    // Storage blocked (private mode, disabled, or full): fall back to a per-call ID.
    return generateId(prefix);
  }
}

export const getVisitorId = (): string =>
  getOrCreateId(() => localStorage, STORAGE_KEYS.VISITOR_ID, "vis");

export const getSessionId = (): string =>
  getOrCreateId(() => sessionStorage, STORAGE_KEYS.SESSION_ID, "sess");

function captureAttribution(): Attribution {
  const params = new URL(window.location.href).searchParams;
  const attribution: Attribution = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    gclid: params.get("gclid"),
    gbraid: params.get("gbraid"),
    wbraid: params.get("wbraid"),
    fbclid: params.get("fbclid"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
  if (attribution.fbclid && !attribution.fbc) {
    attribution.fbc = `fb.1.${Date.now()}.${attribution.fbclid}`;
  }
  return attribution;
}

function readStoredAttribution(): Attribution | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
    if (!stored) return null;
    return { ...EMPTY_ATTRIBUTION, ...(JSON.parse(stored) as Partial<Attribution>) };
  } catch {
    // Storage blocked or entry corrupt: a fresh capture replaces it.
    return null;
  }
}

function storeAttribution(attribution: Attribution): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attribution));
  } catch {
    // Storage unavailable: attribution still travels with this page's submission.
  }
}

/** Capture click IDs/UTMs on landing and persist them for the whole visit. */
export function initAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;
  const url = new URL(window.location.href);
  const hasTrackingParams = TRACKING_PARAMS.some((param) => url.searchParams.has(param));
  const stored = hasTrackingParams ? null : readStoredAttribution();
  if (stored) return stored;
  const attribution = captureAttribution();
  storeAttribution(attribution);
  return attribution;
}
