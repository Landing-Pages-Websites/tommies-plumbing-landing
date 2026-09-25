import Image from "next/image";
import type { ReactElement } from "react";
import { YEARS_EXPERIENCE } from "@/lib/site-config";
import { Reveal } from "@/components/landing/Reveal";

export function WhyTommiesPhoto(): ReactElement {
  return (
    <Reveal className="relative lg:col-span-5">
      <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-card bg-brand-red" />
      <Image src="/brand/photos/tommies-technician.jpg" alt="Plumber in a blue work shirt working on the plumbing under a kitchen sink" width={1100} height={1287} sizes="(min-width: 1024px) 440px, 100vw" className="relative aspect-[6/7] h-auto w-full rounded-card object-cover shadow-lift" />
      <p className="absolute -right-2 top-6 rounded-btn bg-brand-navy px-4 py-3 font-display text-display-5 font-bold text-white shadow-lift sm:-right-6">
        {YEARS_EXPERIENCE}+ years in the trade
      </p>
    </Reveal>
  );
}
