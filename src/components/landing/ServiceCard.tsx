import { Check } from "lucide-react";
import Image from "next/image";
import type { ReactElement } from "react";
import type { ServiceItem } from "@/lib/content";

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps): ReactElement {
  const layout = featured ? "flex-col" : "flex-col sm:flex-row";
  const media = featured ? "aspect-[4/3] w-full" : "aspect-[4/3] w-full sm:aspect-auto sm:min-h-[220px] sm:w-[42%] sm:shrink-0";
  return (
    <article id={service.id} className={`group relative flex h-full overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[box-shadow,transform] duration-150 ease-brand hover:-translate-y-0.5 hover:shadow-lift ${layout}`}>
      <span aria-hidden="true" className={`absolute left-0 top-0 z-10 bg-brand-red ${featured ? "h-1.5 w-full" : "h-full w-1.5"}`} />
      <div className={`relative overflow-hidden ${media}`}>
        <Image src={service.image.src} alt={service.image.alt} fill sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"} className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.03]" />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-8" : "p-6"}`}>
        <p className="w-fit rounded-full bg-brand-navy px-3 py-1 text-fine font-semibold uppercase tracking-[0.08em] text-white">{service.tag}</p>
        <h3 className={`mt-4 font-bold text-ink ${featured ? "text-display-3" : "text-display-4"}`}>{service.title}</h3>
        <p className="mt-2 text-muted">{service.body}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2 font-medium text-ink">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-red-hover" strokeWidth={2.25} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
