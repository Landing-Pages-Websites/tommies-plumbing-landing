import { House, ShieldCheck, Wrench } from "lucide-react";
import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { RatingBadge } from "@/components/landing/RatingBadge";
import { HERO_FORM_ANCHOR, YEARS_EXPERIENCE } from "@/lib/site-config";

const PROOF_POINTS = [
  { icon: House, label: "Locally owned" },
  { icon: Wrench, label: "Plumbing is all we do" },
  { icon: ShieldCheck, label: `${YEARS_EXPERIENCE}+ years in the trade` },
];

/**
 * Below lg the wrapper is `display: contents`, so its blocks join the hero grid and interleave with
 * the photo and form (headline → photo → call → form → proof) to start the form above the fold.
 */
export function HeroCopy(): ReactElement {
  return (
    <div className="contents lg:col-span-7 lg:row-start-1 lg:block">
      <div className="order-1">
        <RatingBadge />
        <h1 id="hero-title" className="mt-4 text-[2.5rem] font-bold leading-[1.02] text-ink sm:mt-6 sm:text-[3rem] lg:text-display-1">
          Need a Local Plumber?
        </h1>
        <p className="mt-4 max-w-xl text-muted sm:mt-5 sm:text-[1.1875rem]">
          Serving homeowners from Morristown to Bristol. Call Tommie&apos;s Plumbing for water heater service, repipes, burst pipes or leaks. Locally owned, plumbing-only service with 30+ years in the trade.
        </p>
      </div>
      <ul className="order-5 flex flex-wrap gap-x-6 gap-y-2 lg:mt-6">
        {PROOF_POINTS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 font-semibold text-ink">
            <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" strokeWidth={1.75} />
            {label}
          </li>
        ))}
      </ul>
      <div className="order-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-8">
        <PhoneButton variant="primary" action="Call Now" />
        <BookButton href={HERO_FORM_ANCHOR} variant="ghost" />
      </div>
    </div>
  );
}
