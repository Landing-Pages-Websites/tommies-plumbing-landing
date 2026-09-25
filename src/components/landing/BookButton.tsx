import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import { BUTTON_STYLES } from "@/lib/button-styles";
import { FORM_ANCHOR, PRIMARY_CTA } from "@/lib/site-config";

interface BookButtonProps {
  label?: string;
  href?: string;
  onDark?: boolean;
  className?: string;
}

export function BookButton({
  label = PRIMARY_CTA,
  href = FORM_ANCHOR,
  onDark = false,
  className = "",
}: BookButtonProps): ReactElement {
  const variant = onDark ? BUTTON_STYLES.primaryOnDark : BUTTON_STYLES.primary;
  return (
    <a href={href} className={`group ${variant} ${className}`}>
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </a>
  );
}
