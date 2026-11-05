import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/button-styles";
import { FORM_ANCHOR, PRIMARY_CTA } from "@/lib/site-config";

interface BookButtonProps {
  label?: string;
  href?: string;
  onDark?: boolean;
  /** Overrides the red primary, e.g. `ghost` where the phone call is the primary action. */
  variant?: ButtonVariant;
  className?: string;
}

export function BookButton({
  label = PRIMARY_CTA,
  href = FORM_ANCHOR,
  onDark = false,
  variant,
  className = "",
}: BookButtonProps): ReactElement {
  const styles = BUTTON_STYLES[variant ?? (onDark ? "primaryOnDark" : "primary")];
  return (
    <a href={href} className={`group ${styles} ${className}`}>
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </a>
  );
}
