import type { ReactElement } from "react";
import { ClubMemberCard } from "@/components/landing/ClubMemberCard";
import { CouponCard } from "@/components/landing/CouponCard";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";

export function OffersSection(): ReactElement {
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-canvas py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHeading id="offers-title" eyebrow="Current savings" title="Current ways to save on plumbing service." intro="Real offers from Tommie's current promotions — mention the one you're using when you book." />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ClubMemberCard />
          </Reveal>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal delayMs={100} className="flex-1">
              <CouponCard amount="$100" title="Water heater installation" detail="Save on a new water heater installed by Tommie's Plumbing." />
            </Reveal>
            <Reveal delayMs={200} className="flex-1">
              <CouponCard amount="$50" title="Any plumbing service over $250" detail="Take $50 off qualifying plumbing service totaling more than $250." />
            </Reveal>
          </div>
        </div>
        <DualCta className="mt-14" />
      </div>
    </section>
  );
}
