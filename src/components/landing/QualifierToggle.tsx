import type { ChangeEvent, ReactElement } from "react";
import { FieldError } from "@/components/landing/FieldError";
import type { HomeownerAnswer } from "@/lib/lead-types";
import { QUALIFIER_QUESTION } from "@/lib/site-config";

interface QualifierToggleProps {
  formId: string;
  value: HomeownerAnswer | "";
  error?: string;
  disabled: boolean;
  onValueChange: (name: "homeowner", value: string) => void;
}

const OPTIONS: { value: HomeownerAnswer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const TILE =
  "flex min-h-12 cursor-pointer items-center justify-center rounded-btn border-2 border-white/70 bg-white/[0.07] px-4 py-2.5 text-body font-bold text-white transition-[background-color,border-color,color] duration-150 ease-brand hover:border-white hover:bg-white/15 peer-checked:border-white peer-checked:bg-white peer-checked:text-brand-navy peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand-navy peer-disabled:cursor-not-allowed peer-disabled:opacity-60";

export function QualifierToggle({ formId, value, error, disabled, onValueChange }: QualifierToggleProps): ReactElement {
  const errorId = `${formId}-homeowner-error`;
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => onValueChange("homeowner", event.target.value);
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-2 text-[0.9375rem] font-semibold text-white">{QUALIFIER_QUESTION}</legend>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((option) => (
          <label key={option.value} className="relative">
            <input type="radio" name="homeowner" value={option.value} required checked={value === option.value} disabled={disabled} onChange={handleChange} className="peer sr-only" />
            <span className={TILE}>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
