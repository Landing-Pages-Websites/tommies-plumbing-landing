import type { ChangeEvent, ReactElement } from "react";
import { FieldError } from "@/components/landing/FieldError";
import { LABEL_CLASS, inputClass } from "@/components/landing/field-styles";
import { EMAIL_PATTERN } from "@/lib/email";
import type { LeadFieldName } from "@/lib/lead-types";

type TextFieldName = Extract<LeadFieldName, "firstName" | "lastName" | "email">;

interface TextFieldProps {
  formId: string;
  name: TextFieldName;
  label: string;
  value: string;
  error?: string;
  disabled: boolean;
  onValueChange: (name: TextFieldName, value: string) => void;
}

const FIELD_META: Record<TextFieldName, { type: string; autoComplete: string; placeholder: string }> = {
  firstName: { type: "text", autoComplete: "given-name", placeholder: "First name" },
  lastName: { type: "text", autoComplete: "family-name", placeholder: "Last name" },
  email: { type: "email", autoComplete: "email", placeholder: "you@example.com" },
};

export function TextField({ formId, name, label, value, error, disabled, onValueChange }: TextFieldProps): ReactElement {
  const id = `${formId}-${name}`;
  const errorId = `${id}-error`;
  const meta = FIELD_META[name];
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => onValueChange(name, event.target.value);
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>{label}</label>
      <input id={id} name={name} type={meta.type} required autoComplete={meta.autoComplete} placeholder={meta.placeholder} pattern={name === "email" ? EMAIL_PATTERN : undefined} title={name === "email" ? "Enter a valid email address (e.g. you@example.com)" : undefined} value={value} disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} onChange={handleChange} className={inputClass(Boolean(error))} />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
