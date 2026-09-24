import type { ReactElement } from "react";
import { DualCta } from "@/components/landing/DualCta";
import { FaqAccordionItem } from "@/components/landing/FaqAccordionItem";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { FAQS } from "@/lib/content";

export function FaqSection(): ReactElement {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions before you book?" intro="Straight answers about services, eligibility, offers, and what happens next." />
          </div>
        </Reveal>
        <div className="flex flex-col gap-3 lg:col-span-8">
          {FAQS.map((item, index) => (
            <Reveal key={item.question} delayMs={index * 60}>
              <FaqAccordionItem item={item} />
            </Reveal>
          ))}
        </div>
      </div>
      <DualCta className="mt-14 px-6" />
    </section>
  );
}
