"use client";

import { useTracking, type TrackingConfig } from "@/hooks/useTracking";

interface TrackingInitProps {
  config: TrackingConfig;
}

/** Client-side MegaTag backup layer (dedupes against the layout loader). */
export function TrackingInit({ config }: TrackingInitProps): null {
  useTracking(config);
  return null;
}
