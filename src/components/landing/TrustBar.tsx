import { History, House, Star, Wrench } from "lucide-react";
import type { ReactElement } from "react";
import { CountUp } from "@/components/landing/CountUp";
import { DualCta } from "@/components/landing/DualCta";
import { Reveal } from "@/components/landing/Reveal";
import { StatCard } from "@/components/landing/StatCard";
import { GOOGLE_RATING, YEARS_EXPERIENCE } from "@/lib/site-config";

const NUMBER_VALUE = "text-[3rem] leading-none";
const WORD_VALUE = "text-[2rem] leading-[1.1]";
const STAGGER_MS = 80;

const STATS = [
  { icon: History, value: <CountUp to={YEARS_EXPERIENCE} suffix="+" />, valueClassName: NUMBER_VALUE, label: "Years of plumbing trade experience" },
  { icon: Star, iconClassName: "fill-star text-star", value: <CountUp to={GOOGLE_RATING} decimals={1} />, valueClassName: NUMBER_VALUE, label: "Star rating on Google" },
  { icon: House, value: "Locally owned", valueClassName: WORD_VALUE, label: "Serving Northeast Tennessee neighbors" },
  { icon: Wrench, value: "Plumbing only", valueClassName: WORD_VALUE, label: "Plumbing is all we do" },
];

export function TrustBar(): ReactElement {
  return (
    <section id="trust-bar" aria-labelledby="trust-title" className="relative overflow-hidden bg-brand-navy-deep py-16 text-white sm:py-20">
      <div aria-hidden="true" className="pipe-texture absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 id="trust-title" className="max-w-3xl text-[1.75rem] font-bold leading-[1.15] sm:text-display-3">
            Local, established, and focused on one trade: plumbing.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <li key={stat.label}>
              <Reveal className="h-full" delayMs={index * STAGGER_MS}>
                <StatCard {...stat} />
              </Reveal>
            </li>
          ))}
        </ul>
        <DualCta onDark className="mt-12" />
      </div>
    </section>
  );
}
