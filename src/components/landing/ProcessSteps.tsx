import type { ReactElement } from "react";
import { Reveal } from "@/components/landing/Reveal";

const STEPS = [
  {
    title: "Tell us what's going on",
    body: "Send the short form or call the office. Four fields and one question — that's it.",
  },
  {
    title: "Your request is received",
    body: "The phone number or email you shared is used to talk it through and set a time.",
  },
  {
    title: "An experienced plumber shows up prepared",
    body: "They explain what's going on and do the job the right way.",
  },
];

export function ProcessSteps(): ReactElement {
  return (
    <div className="relative h-full rounded-card bg-brand-navy p-8 text-white shadow-lift sm:p-10">
      <p className="text-fine font-semibold uppercase tracking-[0.14em] text-brand-blue-tint">How booking works</p>
      <h3 className="mt-3 text-display-3 font-bold">Getting a plumber out takes three simple steps.</h3>
      <div className="relative mt-8">
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 bg-gradient-to-b from-brand-red via-brand-blue to-brand-blue/0" />
        <ol className="relative flex flex-col gap-8">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative">
            <Reveal delayMs={index * 100} className="flex gap-5">
              <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white font-display text-display-4 font-bold text-brand-navy ring-4 ring-brand-navy">
                {index + 1}
              </span>
              <div className="pt-1">
                <h4 className="text-display-4 font-semibold">{step.title}</h4>
                <p className="mt-1.5 text-brand-blue-tint">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
}
