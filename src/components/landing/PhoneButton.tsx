import { Phone } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { BUTTON_STYLES, type ButtonVariant } from "@/lib/button-styles";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_LABEL } from "@/lib/site-config";

interface PhoneButtonProps {
  variant?: Extract<ButtonVariant, "primary" | "ghost" | "ghostOnDark" | "navy">;
  /** Full custom label; ignored when action or numberClassName is set. */
  label?: ReactNode;
  /** Verb shown before the number; omit to keep the default "Call <number>" label. */
  action?: string;
  /** Lets a tight layout hide the number visually; it stays in the DOM for CTM to swap. */
  numberClassName?: string;
  className?: string;
}

// The number never breaks at its hyphens when a narrow button wraps the label.
const DEFAULT_LABEL = (
  <>
    Call <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
  </>
);

function actionLabel(action = "Call", numberClassName = ""): ReactNode {
  return (
    <>
      {action} <span className={`whitespace-nowrap ${numberClassName}`}>{PHONE_DISPLAY}</span>
    </>
  );
}

export function PhoneButton({
  variant = "ghost",
  label = DEFAULT_LABEL,
  action,
  numberClassName,
  className = "",
}: PhoneButtonProps): ReactElement {
  const content = action === undefined && numberClassName === undefined ? label : actionLabel(action, numberClassName);
  return (
    <a href={PHONE_HREF} aria-label={PHONE_LABEL} className={`${BUTTON_STYLES[variant]} ${className}`}>
      <Phone aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.75} />
      <span>{content}</span>
    </a>
  );
}
