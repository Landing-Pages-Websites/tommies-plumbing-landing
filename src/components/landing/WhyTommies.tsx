import type { ReactElement } from "react";
import { CommitmentList } from "@/components/landing/CommitmentList";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { WhyTommiesPhoto } from "@/components/landing/WhyTommiesPhoto";

export function WhyTommies(): ReactElement {
  return (
    <section id="why-tommies" aria-labelledby="why-title" className="overflow-hidden bg-surface py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <WhyTommiesPhoto />
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              id="why-title"
              eyebrow="Why homeowners choose Tommie's"
              title="Plumbing is all we do."
              intro="Tommie's Plumbing brings more than 30 years of plumbing trade experience to families throughout the Tri-Cities and all of Northeast Tennessee."
            />
          </Reveal>
          <CommitmentList />
        </div>
      </div>
      <DualCta className="mt-14 px-6" />
    </section>
  );
}
