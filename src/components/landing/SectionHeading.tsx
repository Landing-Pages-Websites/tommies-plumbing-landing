import type { ReactElement, ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  onDark = false,
  align = "left",
}: SectionHeadingProps): ReactElement {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-3 inline-flex items-center gap-2 text-fine font-semibold uppercase tracking-[0.14em] ${onDark ? "text-brand-blue-tint" : "text-brand-red-hover"}`}
      >
        <span aria-hidden="true" className={`h-0.5 w-6 rounded-full ${onDark ? "bg-brand-blue" : "bg-brand-red"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-[2rem] font-bold leading-[1.08] sm:text-display-2 ${onDark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-body ${onDark ? "text-brand-blue-tint" : "text-muted"}`}>{intro}</p>
      ) : null}
    </div>
  );
}
