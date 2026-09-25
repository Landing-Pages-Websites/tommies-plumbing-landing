import { Phone } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/button-styles";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_LABEL } from "@/lib/site-config";

interface PhoneButtonProps {
  variant?: Extract<ButtonVariant, "ghost" | "ghostOnDark" | "navy">;
  label?: ReactNode;
  className?: string;
}

// The number never breaks at its hyphens when a narrow button wraps the label.
const DEFAULT_LABEL = (
  <>
    Call <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
  </>
);

export function PhoneButton({
  variant = "ghost",
  label = DEFAULT_LABEL,
  className = "",
}: PhoneButtonProps): ReactElement {
  return (
    <a href={PHONE_HREF} aria-label={PHONE_LABEL} className={`${BUTTON_STYLES[variant]} ${className}`}>
      <Phone aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      <span>{label}</span>
    </a>
  );
}
