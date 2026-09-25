import { Droplets, Repeat2, ThermometerSnowflake } from "lucide-react";
import type { ReactElement } from "react";
import { Reveal } from "@/components/landing/Reveal";

const PROBLEMS = [
  {
    icon: ThermometerSnowflake,
    title: "No hot water",
    body: "A water heater that quits or starts leaking turns every shower and load of dishes into a problem.",
  },
  {
    icon: Droplets,
    title: "A pipe that burst or won't stop leaking",
    body: "Water doesn't wait. The longer a busted line runs, the more of your home it reaches.",
  },
  {
    icon: Repeat2,
    title: "Old lines, same leaks again",
    body: "Patching aging pipes one leak at a time gets old fast.",
  },
];

export function ProblemList(): ReactElement {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {PROBLEMS.map(({ icon: Icon, title, body }, index) => (
        <li key={title}>
          <Reveal delayMs={index * 80} className="flex gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-btn bg-brand-red/10">
              <Icon aria-hidden="true" className="h-5 w-5 text-brand-red-hover" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-display-5 font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-muted">{body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
