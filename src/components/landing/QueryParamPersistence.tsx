"use client";

import { useEffect } from "react";

const STORAGE_KEY = "landing_params";

function readParams(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeParams(params: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, params);
  } catch {
    // Storage blocked: params still live in the current URL.
  }
}

/** Keep ad attribution params (utm_*, gclid, fbclid, msclkid…) in the URL across hash navigation. */
export function QueryParamPersistence(): null {
  useEffect(() => {
    if (window.location.search) writeParams(window.location.search);
    const restoreParams = (): void => {
      const stored = readParams();
      if (!stored || window.location.search) return;
      window.history.replaceState(null, "", `${window.location.pathname}${stored}${window.location.hash}`);
    };
    window.addEventListener("hashchange", restoreParams);
    return () => window.removeEventListener("hashchange", restoreParams);
  }, []);
  return null;
}
