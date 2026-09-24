import { Phone } from "lucide-react";
import type { ReactElement } from "react";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/button-styles";
import { PHONE_HREF, PHONE_LABEL, SECONDARY_CTA } from "@/lib/site-config";

interface PhoneButtonProps {
  variant?: Extract<ButtonVariant, "ghost" | "ghostOnDark" | "navy">;
  label?: string;
  className?: string;
}

export function PhoneButton({
  variant = "ghost",
  label = SECONDARY_CTA,
  className = "",
}: PhoneButtonProps): ReactElement {
  return (
    <a href={PHONE_HREF} aria-label={PHONE_LABEL} className={`${BUTTON_STYLES[variant]} ${className}`}>
      <Phone aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      <span>{label}</span>
    </a>
  );
}
