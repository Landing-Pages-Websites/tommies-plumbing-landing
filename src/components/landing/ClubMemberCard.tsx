import { BadgeCheck } from "lucide-react";
import type { ReactElement } from "react";

export function ClubMemberCard(): ReactElement {
  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-card bg-brand-navy p-8 text-white shadow-lift sm:p-10">
      <div aria-hidden="true" className="pipe-texture absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[18px] border-brand-red/80" />
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-red px-3 py-1 text-fine font-semibold uppercase tracking-[0.08em]">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          Club members
        </p>
        <h3 className="mt-6 text-[2.25rem] font-bold leading-[1.05] sm:text-display-2">Your service fee is waived when you proceed with the work.</h3>
      </div>
      <p className="relative mt-8 text-body text-brand-blue-tint">
        Already a Tommie&apos;s club member? Mention your membership when you book, and the service fee comes off when you go ahead with the job.
      </p>
    </article>
  );
}
