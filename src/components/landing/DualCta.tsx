import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { PRIMARY_CTA } from "@/lib/site-config";

interface DualCtaProps {
  primaryLabel?: string;
  onDark?: boolean;
  className?: string;
}

/** Centered, side-by-side form + phone CTAs that close every content section. */
export function DualCta({ primaryLabel = PRIMARY_CTA, onDark = false, className = "" }: DualCtaProps): ReactElement {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <BookButton label={primaryLabel} onDark={onDark} />
      <PhoneButton variant={onDark ? "ghostOnDark" : "ghost"} />
    </div>
  );
}
