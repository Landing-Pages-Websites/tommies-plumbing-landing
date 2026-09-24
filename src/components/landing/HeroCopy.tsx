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

export function HeroCopy(): ReactElement {
  return (
    <div className="order-2 lg:order-none lg:col-span-7 lg:row-start-1">
      <RatingBadge />
      <h1 id="hero-title" className="mt-6 text-[2.5rem] font-bold leading-[1.02] text-ink sm:text-[3rem] lg:text-display-1">
        Plumbing help from <span className="text-brand-navy">Morristown</span> to <span className="text-brand-navy">Bristol</span>
      </h1>
      <p className="mt-5 max-w-xl text-[1.1875rem] leading-[1.55] text-muted">
        No hot water, a busted pipe, or old lines that need a repipe? Tommie&apos;s Plumbing is a locally owned, plumbing-only team with more than 30 years of trade experience across Northeast Tennessee.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {PROOF_POINTS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 font-semibold text-ink">
            <Icon aria-hidden="true" className="h-5 w-5 text-brand-red" strokeWidth={1.75} />
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <BookButton href={HERO_FORM_ANCHOR} />
        <PhoneButton />
      </div>
    </div>
  );
}
