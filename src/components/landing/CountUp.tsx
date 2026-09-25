"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useInView } from "@/hooks/useInView";

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
}

const DURATION_MS = 1200;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** One-shot counter; the final value is always what screen readers and no-JS visitors get. */
export function CountUp({ to, decimals = 0, suffix = "" }: CountUpProps): ReactElement {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number): void => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setValue(to * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} aria-label={`${to.toFixed(decimals)}${suffix}`}>
      <span aria-hidden="true">{`${value.toFixed(decimals)}${suffix}`}</span>
    </span>
  );
}
