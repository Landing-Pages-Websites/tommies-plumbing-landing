import { Quote } from "lucide-react";
import type { ReactElement } from "react";
import { Reveal } from "@/components/landing/Reveal";

/** Grounded excerpt from the client's reviews page; author kept anonymous (not confirmed). */
export function ReviewQuote(): ReactElement {
  return (
    <Reveal delayMs={120} className="lg:col-span-8">
      <figure className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card sm:p-12">
        <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1.5 bg-brand-red" />
        <Quote aria-hidden="true" className="h-10 w-10 text-brand-red" strokeWidth={1.75} />
        <blockquote className="font-display text-[1.625rem] font-semibold leading-[1.3] text-ink sm:text-[2rem]">
          &ldquo;I had Jacob and Cooper come and do several jobs for me, a few small and a few very big. They were here all day, spent&hellip;&rdquo;
        </blockquote>
        <figcaption className="text-muted">Customer review excerpt, from Tommie&apos;s Plumbing reviews</figcaption>
      </figure>
    </Reveal>
  );
}
