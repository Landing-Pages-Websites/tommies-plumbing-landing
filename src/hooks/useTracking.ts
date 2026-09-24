"use client";

import { useEffect } from "react";
import { MEGA_ENDPOINTS, isPlaceholderId } from "@/lib/mega-config";

export interface TrackingConfig {
  siteKey: string;
  gtmId?: string;
  pixelId?: string;
}

type MegaWindow = Window & {
  MEGA_TAG_CONFIG?: TrackingConfig;
  API_ENDPOINT?: string;
  TRACKING_API_ENDPOINT?: string;
};

/**
 * Client-side backup for the MegaTag loader in layout.tsx. Dedupes on
 * #optimizer-script and fails closed while the siteKey is a placeholder.
 */
export function useTracking(config: TrackingConfig): void {
  useEffect(() => {
    if (isPlaceholderId(config.siteKey)) return;
    if (document.getElementById("optimizer-script")) return;
    const w = window as MegaWindow;
    w.MEGA_TAG_CONFIG = config;
    w.API_ENDPOINT = MEGA_ENDPOINTS.OPTIMIZER_API;
    w.TRACKING_API_ENDPOINT = MEGA_ENDPOINTS.TRACKING_API;
    const script = document.createElement("script");
    script.id = "optimizer-script";
    script.src = MEGA_ENDPOINTS.OPTIMIZER_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }, [config]);
}
