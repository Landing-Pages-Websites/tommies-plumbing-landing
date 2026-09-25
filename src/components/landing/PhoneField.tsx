import { Check } from "lucide-react";
import type { ReactElement } from "react";
import { FieldError } from "@/components/landing/FieldError";
import { LABEL_CLASS, inputClass } from "@/components/landing/field-styles";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { PHONE_PATTERN, isValidPhone } from "@/lib/phone";

interface PhoneFieldProps {
  formId: string;
  value: string;
  error?: string;
  disabled: boolean;
  onValueChange: (name: "phone", value: string) => void;
  onReject: (message: string) => void;
}

/**
 * US phone: 10 digits (a +1 prefix is accepted and removed). Every edit runs usePhoneInput → parsePhoneInput →
 * formatPhone "(XXX) XXX-XXXX"; over-long edits are rejected whole with an inline error, and isValidPhone gates submit.
 */
export function PhoneField({ formId, value, error, disabled, onValueChange, onReject }: PhoneFieldProps): ReactElement {
  const id = `${formId}-phone`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const { handleChange, handlePaste, handleCompositionStart, handleCompositionEnd } = usePhoneInput({ value, onValueChange, onReject });
  const complete = isValidPhone(value) && !error;
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>Phone</label>
      <p id={hintId} className="sr-only">10-digit US number. A +1 country code is removed automatically.</p>
      <div className="relative">
        <input id={id} name="phone" type="tel" inputMode="numeric" required autoComplete="tel-national" placeholder="(___) ___-____" pattern={PHONE_PATTERN} title="Please enter a valid 10-digit phone number" value={value} disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={error ? `${errorId} ${hintId}` : hintId} onChange={handleChange} onPaste={handlePaste} onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd} className={`${inputClass(Boolean(error))} pr-11`} />
        {complete ? (
          <Check aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-blue-tint" strokeWidth={2} />
        ) : null}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
