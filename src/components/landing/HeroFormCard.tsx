import type { ReactElement } from "react";
import { FormCard } from "@/components/landing/FormCard";

export function HeroFormCard(): ReactElement {
  return (
    <div id="hero-form" className="order-4 scroll-mt-28 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start">
      <FormCard formId="hero-lead-form" titleId="hero-form-title" title="Book plumbing service" subtitle="Tell us what's going on. Four quick fields and one question." className="ring-1 ring-white/10" />
    </div>
  );
}
