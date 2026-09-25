import type { ReactElement } from "react";
import { HeroCopy } from "@/components/landing/HeroCopy";
import { HeroFormCard } from "@/components/landing/HeroFormCard";
import { HeroPhoto } from "@/components/landing/HeroPhoto";

/**
 * One continuous surface: a light blueprint field under the headline that settles into a full-width
 * navy band (lg+). The band starts partway down the photo row, so the photo and the form both sit
 * across the seam, and it runs flush into the navy #trust-bar below — no vertical cut behind the form.
 */
export function HeroSection(): ReactElement {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero-surface relative isolate overflow-hidden pb-16 pt-[5.5rem] sm:pt-32 lg:pb-16 lg:pt-36">
      <div aria-hidden="true" className="hero-blueprint absolute inset-0 -z-10" />
      <div className="relative mx-auto grid max-w-[1200px] gap-5 px-6 sm:gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
        <HeroCopy />
        <HeroPhoto />
        <HeroFormCard />
        <div aria-hidden="true" className="relative -z-10 hidden lg:col-span-full lg:row-start-2 lg:-mb-16 lg:mt-24 lg:block">
          <div className="hero-band pipe-texture absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-brand-navy-deep" />
        </div>
      </div>
    </section>
  );
}
