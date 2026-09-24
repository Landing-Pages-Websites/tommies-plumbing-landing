import type { ReactElement } from "react";
import { DualCta } from "@/components/landing/DualCta";
import { ProblemList } from "@/components/landing/ProblemList";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function HowItWorks(): ReactElement {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading id="how-title" eyebrow="Sound familiar?" title="Plumbing problems don't fix themselves." />
          </Reveal>
          <ProblemList />
        </div>
        <div className="lg:col-span-7">
          <ProcessSteps />
        </div>
      </div>
      <DualCta className="mt-14 px-6" />
    </section>
  );
}
