import { ClipboardCheck, MessageSquareText, Wrench } from "lucide-react";
import type { ReactElement } from "react";
import { Reveal } from "@/components/landing/Reveal";

const COMMITMENTS = [
  { icon: ClipboardCheck, title: "Show up prepared", body: "Experienced plumbers arrive ready for the job you described." },
  { icon: MessageSquareText, title: "Explain what's going on", body: "You hear what's wrong and what it takes to fix it." },
  { icon: Wrench, title: "Do the job the right way", body: "Plumbing is all we do, so the job gets done right." },
];

export function CommitmentList(): ReactElement {
  return (
    <ol className="mt-10 flex flex-col gap-4">
      {COMMITMENTS.map(({ icon: Icon, title, body }, index) => (
        <li key={title}>
          <Reveal delayMs={index * 90} className="flex items-start gap-5 rounded-card border border-line bg-canvas p-5 transition-colors duration-150 hover:border-brand-navy/40">
            <span className="font-display text-display-3 font-bold leading-none text-brand-red-hover">{`0${index + 1}`}</span>
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-display-4 font-semibold text-ink">
                <Icon aria-hidden="true" className="h-5 w-5 text-brand-navy" strokeWidth={1.75} />
                {title}
              </h3>
              <p className="mt-1 text-muted">{body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
