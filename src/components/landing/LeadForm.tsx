"use client";

import { LockKeyhole } from "lucide-react";
import type { ReactElement } from "react";
import { FormResult } from "@/components/landing/FormResult";
import { PhoneField } from "@/components/landing/PhoneField";
import { QualifierToggle } from "@/components/landing/QualifierToggle";
import { SubmitButton } from "@/components/landing/SubmitButton";
import { TextField } from "@/components/landing/TextField";
import { useLeadForm } from "@/hooks/useLeadForm";

interface LeadFormProps {
  formId: string;
}

/** Shared lead form (hero + final section): firstName, lastName, email, phone + homeowner qualifier. */
export function LeadForm({ formId }: LeadFormProps): ReactElement {
  const { formRef, values, errors, status, setField, rejectPhone, handleClick, handleKeyDown, blockNativeSubmit, retry } = useLeadForm(formId);
  if (status === "success" || status === "error") {
    return <FormResult outcome={status} firstName={values.firstName} homeowner={values.homeowner} onRetry={retry} />;
  }
  const busy = status === "submitting";
  return (
    <form ref={formRef} id={formId} name={formId} noValidate onSubmit={blockNativeSubmit} onKeyDown={handleKeyDown} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField formId={formId} name="firstName" label="First name" value={values.firstName} error={errors.firstName} disabled={busy} onValueChange={setField} />
        <TextField formId={formId} name="lastName" label="Last name" value={values.lastName} error={errors.lastName} disabled={busy} onValueChange={setField} />
      </div>
      <TextField formId={formId} name="email" label="Email" value={values.email} error={errors.email} disabled={busy} onValueChange={setField} />
      <PhoneField formId={formId} value={values.phone} error={errors.phone} disabled={busy} onValueChange={setField} onReject={rejectPhone} />
      <QualifierToggle formId={formId} value={values.homeowner} error={errors.homeowner} disabled={busy} onValueChange={setField} />
      <SubmitButton busy={busy} onClick={handleClick} />
      <p className="flex items-start gap-2 text-fine text-brand-blue-tint">
        <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
        We use your details only to respond to this service request.
      </p>
    </form>
  );
}
