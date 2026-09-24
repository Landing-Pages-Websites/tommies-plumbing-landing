import { MapPin } from "lucide-react";
import type { ReactElement } from "react";
import { CorridorMap } from "@/components/landing/CorridorMap";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { CITIES } from "@/lib/content";

export function ServiceArea(): ReactElement {
  return (
    <section id="service-area" aria-labelledby="area-title" className="relative overflow-hidden bg-brand-navy-deep py-20 text-white sm:py-24">
      <div aria-hidden="true" className="pipe-texture absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading onDark id="area-title" eyebrow="Service area" title="Serving Northeast Tennessee from Morristown to Bristol." intro="Proudly serving the Tri-Cities and the communities in between. If you're along this corridor, you're in the right place." />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {CITIES.map((city) => (
              <li key={city} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.08] px-3.5 py-1.5 text-fine font-semibold uppercase tracking-[0.06em] text-white">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-brand-red" strokeWidth={2} />
                {city}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delayMs={120} className="lg:col-span-7">
          <div className="rounded-card border border-white/15 bg-brand-navy/60 p-4 shadow-lift backdrop-blur-sm sm:p-8">
            <CorridorMap />
          </div>
        </Reveal>
      </div>
      <DualCta onDark className="relative mt-14 px-6" />
    </section>
  );
}
