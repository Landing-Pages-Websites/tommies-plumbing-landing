import type { ReactElement } from "react";
import { DualCta } from "@/components/landing/DualCta";
import { RatingCard } from "@/components/landing/RatingCard";
import { Reveal } from "@/components/landing/Reveal";
import { ReviewQuote } from "@/components/landing/ReviewQuote";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function ReviewsSection(): ReactElement {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHeading id="reviews-title" eyebrow="See what your neighbors are saying" title="Trusted by Northeast Tennessee neighbors." />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <RatingCard />
          <ReviewQuote />
        </div>
        <DualCta className="mt-14" />
      </div>
    </section>
  );
}
