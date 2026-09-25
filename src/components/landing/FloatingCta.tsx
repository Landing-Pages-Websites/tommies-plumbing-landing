"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { BUTTON_STYLES } from "@/lib/button-styles";
import { FORM_ANCHOR, PRIMARY_CTA } from "@/lib/site-config";

const WATCHED_SECTIONS = ["hero", "form"];

/** Form-only floating CTA: appears after the hero, hides while a form section is on screen. */
export function FloatingCta(): ReactElement {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScreen: Record<string, boolean> = { hero: true, form: false };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        onScreen[entry.target.id] = entry.isIntersecting;
      });
      setVisible(!onScreen.hero && !onScreen.form);
    });
    WATCHED_SECTIONS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="floating-cta" aria-hidden={!visible} className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur transition-[transform,opacity] duration-300 ease-brand sm:inset-x-auto sm:bottom-6 sm:right-6 sm:rounded-card sm:border sm:p-2 sm:shadow-lift ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0 sm:translate-y-8"}`}>
      <a href={FORM_ANCHOR} tabIndex={visible ? 0 : -1} className={`group w-full ${BUTTON_STYLES.primary} sm:w-auto`}>
        <span>{PRIMARY_CTA}</span>
        <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.75} />
      </a>
    </div>
  );
}
