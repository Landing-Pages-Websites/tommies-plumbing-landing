import type { ReactElement } from "react";
import { ClubMemberCard } from "@/components/landing/ClubMemberCard";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function OffersSection(): ReactElement {
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHeading id="offers-title" eyebrow="Current savings" title="Current ways to save on plumbing service." intro="Club-member savings from Tommie's Plumbing, mention your membership when you book." />
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <ClubMemberCard />
        </Reveal>
        <DualCta className="mt-14" />
      </div>
    </section>
  );
}
