import type { ReactElement } from "react";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { ServiceCard } from "@/components/landing/ServiceCard";
import { SERVICES } from "@/lib/content";

export function ServicesSection(): ReactElement {
  const [featured, ...rest] = SERVICES;
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" eyebrow="What we can help with" title="Water heaters, repipes, and busted pipes." />
          <p className="max-w-md text-muted lg:pb-2">
            Pick the one that brought you here. Every visit comes with an experienced plumber who explains the problem before doing the work.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ServiceCard service={featured} featured />
          </Reveal>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((service, index) => (
              <Reveal key={service.id} delayMs={(index + 1) * 100} className="flex-1">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
        <DualCta primaryLabel="Schedule Service" className="mt-14" />
      </div>
    </section>
  );
}
