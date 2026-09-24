import type { ReactElement } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { StarRow } from "@/components/landing/StarRow";
import { GOOGLE_RATING } from "@/lib/site-config";

export function RatingCard(): ReactElement {
  return (
    <Reveal className="lg:col-span-4">
      <div className="flex h-full flex-col justify-between gap-8 rounded-card bg-brand-navy p-8 text-white shadow-lift">
        <p className="text-fine font-semibold uppercase tracking-[0.14em] text-brand-blue-tint">Google rating</p>
        <div>
          <p className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.03em]">{GOOGLE_RATING}</p>
          <div className="mt-3"><StarRow className="h-6 w-6" /></div>
          <p className="mt-4 text-brand-blue-tint">Out of 5 stars across Tommie&apos;s Google Business Profiles.</p>
        </div>
      </div>
    </Reveal>
  );
}
