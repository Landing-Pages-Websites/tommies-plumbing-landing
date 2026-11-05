import { Phone } from "lucide-react";
import type { ReactElement } from "react";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/button-styles";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_LABEL } from "@/lib/site-config";

interface PhoneButtonProps {
  variant?: Extract<ButtonVariant, "primary" | "ghost" | "ghostOnDark" | "navy">;
  /** Verb shown before the number. */
  action?: string;
  /** Lets a tight layout hide the number visually; it stays in the DOM for CTM to swap. */
  numberClassName?: string;
  className?: string;
}

export function PhoneButton({
  variant = "ghost",
  action = "Call",
  numberClassName = "",
  className = "",
}: PhoneButtonProps): ReactElement {
  return (
    <a href={PHONE_HREF} aria-label={PHONE_LABEL} className={`${BUTTON_STYLES[variant]} ${className}`}>
      <Phone aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      {/* The number never breaks at its hyphens when a narrow button wraps the label. */}
      <span>
        {action} <span className={`whitespace-nowrap ${numberClassName}`}>{PHONE_DISPLAY}</span>
      </span>
    </a>
  );
}
