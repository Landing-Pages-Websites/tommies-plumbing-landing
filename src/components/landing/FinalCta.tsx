import Image from "next/image";
import type { ReactElement } from "react";
import { FinalCtaCopy } from "@/components/landing/FinalCtaCopy";
import { FormCard } from "@/components/landing/FormCard";

export function FinalCta(): ReactElement {
  return (
    <section id="form" aria-labelledby="final-title" className="relative overflow-hidden bg-brand-navy-deep text-white">
      <div aria-hidden="true" className="h-1.5 bg-brand-red" />
      <div className="relative h-40 sm:h-56">
        <Image src="/brand/photos/tommies-fleet.jpg" alt="Tommie's Plumbing service vans parked outside the shop" fill sizes="100vw" className="object-cover object-[center_60%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/10 via-brand-navy-deep/40 to-brand-navy-deep" />
      </div>
      <div aria-hidden="true" className="pipe-texture absolute inset-x-0 bottom-0 top-40 sm:top-56" />
      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-6 pb-20 pt-6 lg:grid-cols-12 lg:pb-24">
        <FinalCtaCopy />
        <FormCard formId="final-lead-form" titleId="final-form-title" title="Book plumbing service" subtitle="Same four fields, one quick question." className="lg:col-span-6 lg:-mt-24" />
      </div>
    </section>
  );
}
