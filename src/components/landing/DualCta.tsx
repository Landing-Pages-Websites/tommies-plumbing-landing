import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { PRIMARY_CTA } from "@/lib/site-config";

interface DualCtaProps {
  primaryLabel?: string;
  onDark?: boolean;
  className?: string;
}

// Below sm the two CTAs split the row 50/50 and wrap their labels instead of stacking.
const MOBILE_FIT = "min-w-0 max-sm:gap-1.5 max-sm:px-3 max-sm:text-[0.9375rem] max-sm:leading-[1.2] max-sm:text-center";

/** Centered, side-by-side form + phone CTAs that close every content section, at every width. */
export function DualCta({ primaryLabel = PRIMARY_CTA, onDark = false, className = "" }: DualCtaProps): ReactElement {
  return (
    <div className={`mx-auto grid w-full max-w-md grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:gap-4 ${className}`}>
      <BookButton label={primaryLabel} onDark={onDark} className={`${MOBILE_FIT} max-sm:[&>svg]:hidden`} />
      <PhoneButton variant={onDark ? "ghostOnDark" : "ghost"} className={MOBILE_FIT} />
    </div>
  );
}
