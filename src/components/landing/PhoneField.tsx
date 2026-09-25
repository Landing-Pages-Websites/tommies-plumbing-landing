import { Check } from "lucide-react";
import type { ChangeEvent, ReactElement } from "react";
import { FieldError } from "@/components/landing/FieldError";
import { LABEL_CLASS, inputClass } from "@/components/landing/field-styles";
import { PHONE_PATTERN, formatPhone, isValidPhone } from "@/lib/phone";

interface PhoneFieldProps {
  formId: string;
  value: string;
  error?: string;
  disabled: boolean;
  onValueChange: (name: "phone", value: string) => void;
}

/** US phone: formatPhone accepts typed or pasted +1 numbers and never drops digits; isValidPhone gates submit. */
export function PhoneField({ formId, value, error, disabled, onValueChange }: PhoneFieldProps): ReactElement {
  const id = `${formId}-phone`;
  const errorId = `${id}-error`;
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => onValueChange("phone", formatPhone(event.target.value));
  const complete = isValidPhone(value);
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>Phone</label>
      <div className="relative">
        <input id={id} name="phone" type="tel" inputMode="numeric" required autoComplete="tel-national" placeholder="(___) ___-____" pattern={PHONE_PATTERN} title="Please enter a valid 10-digit phone number" value={value} disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} onChange={handleChange} className={`${inputClass(Boolean(error))} pr-11`} />
        {complete ? (
          <Check aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-blue-tint" strokeWidth={2} />
        ) : null}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
