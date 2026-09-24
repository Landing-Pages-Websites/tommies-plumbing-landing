import { Check } from "lucide-react";
import type { ReactElement } from "react";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { OFFER_EXPIRY } from "@/lib/site-config";

const REASSURANCES = [
  "Locally owned, plumbing-only team",
  "More than 30 years of trade experience",
  `$100 off water heater installation through ${OFFER_EXPIRY}`,
];

export function FinalCtaCopy(): ReactElement {
  return (
    <div className="lg:col-span-6">
      <p className="text-fine font-semibold uppercase tracking-[0.14em] text-brand-blue-tint">If you gotta leak, let Tommie&apos;s take a peek.</p>
      <h2 id="final-title" className="mt-4 text-[2.25rem] font-bold leading-[1.05] sm:text-display-2 lg:text-[3rem]">Book plumbing service with a local team that does it right.</h2>
      <p className="mt-5 max-w-lg text-[1.125rem] text-brand-blue-tint">Send the form and Tommie&apos;s local office will follow up, or call now to talk it through.</p>
      <ul className="mt-8 flex flex-col gap-3">
        {REASSURANCES.map((line) => (
          <li key={line} className="flex items-center gap-3 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-red"><Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} /></span>
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <PhoneButton variant="ghostOnDark" />
      </div>
    </div>
  );
}
