import { BadgePercent } from "lucide-react";
import Image from "next/image";
import type { ReactElement } from "react";
import { OFFER_EXPIRY } from "@/lib/site-config";

export function HeroPhoto(): ReactElement {
  return (
    <figure className="relative order-1 overflow-hidden rounded-card shadow-lift lg:order-none lg:col-span-7 lg:row-start-2">
      <Image src="/brand/photos/hero.jpg" alt="Plumber servicing a wall-mounted tankless water heater in a home laundry room" width={1344} height={768} priority sizes="(min-width: 1024px) 680px, 100vw" className="aspect-[16/9] h-auto w-full object-cover object-[center_40%]" />
      <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-brand-navy-deep/90 px-3.5 py-1.5 text-fine font-semibold text-white backdrop-blur">
        <BadgePercent aria-hidden="true" className="h-4 w-4 text-brand-blue-tint" strokeWidth={1.75} />
        $100 off water heater installation · expires {OFFER_EXPIRY}
      </figcaption>
    </figure>
  );
}
