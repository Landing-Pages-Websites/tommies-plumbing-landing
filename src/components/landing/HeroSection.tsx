import type { ReactElement } from "react";
import { HeroCopy } from "@/components/landing/HeroCopy";
import { HeroFormCard } from "@/components/landing/HeroFormCard";
import { HeroPhoto } from "@/components/landing/HeroPhoto";

export function HeroSection(): ReactElement {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative min-h-[90vh] overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-brand-navy-deep lg:block" />
      <div aria-hidden="true" className="pipe-texture absolute inset-y-0 right-0 hidden w-[38%] lg:block" />
      <div className="relative mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
        <HeroCopy />
        <HeroPhoto />
        <HeroFormCard />
      </div>
    </section>
  );
}
