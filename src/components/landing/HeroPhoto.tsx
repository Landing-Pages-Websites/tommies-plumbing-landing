import Image from "next/image";
import type { ReactElement } from "react";

export function HeroPhoto(): ReactElement {
  return (
    <figure className="relative order-2 overflow-hidden rounded-card shadow-lift ring-1 ring-brand-navy-deep/10 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:self-start">
      <Image src="/brand/photos/hero.jpg" alt="Plumber servicing a wall-mounted tankless water heater in a home laundry room" width={1344} height={768} priority sizes="(min-width: 1024px) 680px, 100vw" className="aspect-[2/1] h-auto w-full object-cover object-[center_40%] sm:aspect-[16/9]" />
    </figure>
  );
}
