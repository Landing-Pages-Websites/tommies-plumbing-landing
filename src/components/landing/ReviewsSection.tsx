import type { ReactElement } from "react";
import { DualCta } from "@/components/landing/DualCta";
import { RatingCard } from "@/components/landing/RatingCard";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { GOOGLE_RATING, YEARS_EXPERIENCE } from "@/lib/site-config";

export function ReviewsSection(): ReactElement {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              id="reviews-title"
              eyebrow="Rated on Google"
              title="Trusted by Northeast Tennessee neighbors."
              intro={`Tommie's holds a ${GOOGLE_RATING}-star rating across its three Google Business Profiles — earned by a locally owned, plumbing-only team with more than ${YEARS_EXPERIENCE} years in the trade.`}
            />
          </Reveal>
          <RatingCard />
        </div>
        <DualCta className="mt-14" />
      </div>
    </section>
  );
}
