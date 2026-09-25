import type { ReactElement } from "react";
import { StarRow } from "@/components/landing/StarRow";
import { GOOGLE_RATING } from "@/lib/site-config";

export function RatingBadge(): ReactElement {
  return (
    <p className="inline-flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-2 pr-4 shadow-card">
      <span className="rounded-full bg-brand-navy px-2.5 py-1 text-fine font-bold text-white">{GOOGLE_RATING}</span>
      <StarRow />
      <span className="text-fine font-semibold uppercase tracking-[0.08em] text-ink">Google rating</span>
    </p>
  );
}
