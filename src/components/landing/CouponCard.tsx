import type { ReactElement } from "react";
import { OFFER_TERMS } from "@/lib/site-config";

interface CouponCardProps {
  amount: string;
  title: string;
  detail: string;
}

const NOTCH = "absolute top-1/2 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-canvas sm:block";

export function CouponCard({ amount, title, detail }: CouponCardProps): ReactElement {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow duration-150 hover:shadow-lift sm:flex-row">
      <div className="relative flex items-center gap-2 bg-brand-red px-7 py-6 text-white sm:w-[44%] sm:flex-col sm:items-start sm:justify-center">
        <p className="font-display text-[3.5rem] font-extrabold leading-[0.9] tracking-[-0.03em] sm:text-[4.5rem]">{amount}</p>
        <p className="font-display text-display-4 font-bold uppercase tracking-[0.06em]">off</p>
      </div>
      <span aria-hidden="true" className={`${NOTCH} left-[44%] -translate-x-1/2`} />
      <div className="flex flex-1 flex-col justify-center gap-2 border-t-2 border-dashed border-line px-7 py-6 sm:border-l-2 sm:border-t-0">
        <p className="w-fit rounded-full bg-brand-blue-wash px-3 py-1 text-fine font-semibold uppercase tracking-[0.08em] text-brand-navy">Current offer</p>
        <h3 className="text-display-4 font-bold text-ink">{title}</h3>
        <p className="text-muted">{detail}</p>
        <p className="mt-1 text-fine text-muted">{OFFER_TERMS}</p>
      </div>
    </article>
  );
}
