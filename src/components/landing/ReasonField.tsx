import type { ChangeEvent, ReactElement } from "react";
import { LABEL_CLASS, inputClass } from "@/components/landing/field-styles";

interface ReasonFieldProps {
  formId: string;
  value: string;
  disabled: boolean;
  onValueChange: (name: "reasonForContact", value: string) => void;
}

const REASON_ROWS = 3;

/** Optional free-text reason; never validated, submitted as typed. */
export function ReasonField({ formId, value, disabled, onValueChange }: ReasonFieldProps): ReactElement {
  const id = `${formId}-reasonForContact`;
  const hintId = `${id}-hint`;
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => onValueChange("reasonForContact", event.target.value);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={LABEL_CLASS}>Reason for contacting us</label>
        <span id={hintId} className="text-fine text-brand-blue-tint">Optional</span>
      </div>
      <textarea id={id} name="reasonForContact" rows={REASON_ROWS} placeholder="For example: no hot water, or a leak under the sink." value={value} disabled={disabled} aria-describedby={hintId} onChange={handleChange} className={`${inputClass(false)} resize-y`} />
    </div>
  );
}
