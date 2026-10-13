"use client";

import { LockKeyhole } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { FormResult } from "@/components/landing/FormResult";
import { PhoneField } from "@/components/landing/PhoneField";
import { QualifierToggle } from "@/components/landing/QualifierToggle";
import { SubmitButton } from "@/components/landing/SubmitButton";
import { TextField } from "@/components/landing/TextField";
import { useLeadForm } from "@/hooks/useLeadForm";

interface LeadFormProps {
  formId: string;
}

const LP_PRIVACY_URL = "https://book.tommiesplumbing.com/privacy";
const LP_TERMS_URL = "https://book.tommiesplumbing.com/terms";
const SUBMISSION_ENDPOINT = "https://analytics.gomega.ai/submission/submit";

interface SmsWindow extends Window {
  __tommieSmsConsent?: boolean;
  __tommieSmsPatch?: boolean;
}

function publishSmsConsent(value: boolean): void {
  (window as SmsWindow).__tommieSmsConsent = value;
}

/**
 * useLeadForm submits a fixed field list. This adds smsConsent to that JSON
 * body. The checkbox is not part of useLeadForm validation.
 */
function installSmsConsentPatch(): void {
  const host = window as SmsWindow;
  if (host.__tommieSmsPatch) return;
  host.__tommieSmsPatch = true;
  const original = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url.startsWith(SUBMISSION_ENDPOINT) && typeof init?.body === "string") {
      try {
        const payload = JSON.parse(init.body) as { form_data?: Record<string, unknown> };
        if (payload.form_data) {
          payload.form_data.smsConsent = host.__tommieSmsConsent === true;
          init = { ...init, body: JSON.stringify(payload) };
        }
      } catch {
        /* leave the body unchanged */
      }
    }
    return original(input, init);
  };
}

/** Shared lead form (hero + final section): firstName, lastName, email, phone + homeowner qualifier. */
export function LeadForm({ formId }: LeadFormProps): ReactElement {
  const { formRef, values, errors, status, setField, rejectPhone, handleClick, handleKeyDown, blockNativeSubmit, retry } = useLeadForm(formId);
  const [smsConsent, setSmsConsent] = useState(false);

  useEffect(() => {
    installSmsConsentPatch();
  }, []);

  if (status === "success" || status === "error") {
    return <FormResult outcome={status} firstName={values.firstName} homeowner={values.homeowner} onRetry={retry} />;
  }
  const busy = status === "submitting";
  return (
    <form
      ref={formRef}
      id={formId}
      name={formId}
      noValidate
      onSubmit={blockNativeSubmit}
      onKeyDown={(event) => {
        if (event.key === "Enter") publishSmsConsent(smsConsent);
        handleKeyDown(event);
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField formId={formId} name="firstName" label="First name" value={values.firstName} error={errors.firstName} disabled={busy} onValueChange={setField} />
        <TextField formId={formId} name="lastName" label="Last name" value={values.lastName} error={errors.lastName} disabled={busy} onValueChange={setField} />
      </div>
      <TextField formId={formId} name="email" label="Email" value={values.email} error={errors.email} disabled={busy} onValueChange={setField} />
      <PhoneField formId={formId} value={values.phone} error={errors.phone} disabled={busy} onValueChange={setField} onReject={rejectPhone} />
      <QualifierToggle formId={formId} value={values.homeowner} error={errors.homeowner} disabled={busy} onValueChange={setField} />
      <div className="flex items-start gap-3">
        <input
          id={`${formId}-smsConsent`}
          name="smsConsent"
          type="checkbox"
          value="true"
          checked={smsConsent}
          onChange={(event) => {
            const next = event.target.checked;
            setSmsConsent(next);
            publishSmsConsent(next);
          }}
          className="mt-1 size-4 shrink-0 accent-white"
        />
        <div>
          <label htmlFor={`${formId}-smsConsent`} className="cursor-pointer text-[0.8125rem] leading-relaxed text-white">
            By checking this box, you agree to receive SMS customer-care messages from Tommie&apos;s Plumbing, including appointment scheduling and confirmations, reminders, and service-related communications about your request. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.{" "}
            <a href={LP_PRIVACY_URL} className="font-semibold text-white underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            {" | "}
            <a href={LP_TERMS_URL} className="font-semibold text-white underline" target="_blank" rel="noopener noreferrer">
              Terms
            </a>
          </label>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-brand-blue-tint">
            Optional. You can submit this form without opting in to text messages.
          </p>
        </div>
      </div>
      <SubmitButton
        busy={busy}
        onClick={() => {
          publishSmsConsent(smsConsent);
          handleClick();
        }}
      />
      <p className="flex items-start gap-2 text-fine text-brand-blue-tint">
        <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
        We use your details only to respond to this service request.
      </p>
    </form>
  );
}
