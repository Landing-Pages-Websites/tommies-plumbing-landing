"use client";

import { Plus } from "lucide-react";
import { useId, useState, type ReactElement } from "react";
import type { FaqItem } from "@/lib/content";

interface FaqAccordionItemProps {
  item: FaqItem;
}

/** FAQ disclosure — collapsed on load, one toggle per question. */
export function FaqAccordionItem({ item }: FaqAccordionItemProps): ReactElement {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  const toggle = (): void => setOpen((current) => !current);
  return (
    <div className={`rounded-card border bg-surface transition-[border-color,box-shadow] duration-150 ${open ? "border-brand-navy/40 shadow-card" : "border-line hover:border-brand-navy/30"}`}>
      <h3>
        <button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={toggle} className="flex w-full items-center justify-between gap-4 rounded-card px-5 py-5 text-left font-display text-display-5 font-semibold text-ink transition-colors duration-150 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy sm:px-6">
          <span>{item.question}</span>
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-200 ease-brand ${open ? "rotate-45 bg-brand-red text-white" : "bg-brand-blue-wash text-brand-navy"}`}>
            <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="px-5 pb-5 sm:px-6">
        <p className="text-muted">{item.answer}</p>
      </div>
    </div>
  );
}
