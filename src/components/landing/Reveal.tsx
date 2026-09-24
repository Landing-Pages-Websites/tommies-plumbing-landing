"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Fade-up entrance on scroll (450ms, brand easing); CSS disables it for reduced motion. */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps): ReactElement {
  const [ref, visible] = useInView<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delayMs}ms` };
  return (
    <div ref={ref} data-visible={visible} style={style} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
