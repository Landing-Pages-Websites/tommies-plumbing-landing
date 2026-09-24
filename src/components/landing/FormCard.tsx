import type { ReactElement } from "react";
import { LeadForm } from "@/components/landing/LeadForm";

interface FormCardProps {
  formId: string;
  titleId: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function FormCard({ formId, titleId, title, subtitle, className = "" }: FormCardProps): ReactElement {
  return (
    <div className={`relative overflow-hidden rounded-card bg-brand-navy shadow-form ${className}`}>
      <div aria-hidden="true" className="h-1.5 bg-brand-red" />
      <div aria-hidden="true" className="pipe-texture absolute inset-0 opacity-60" />
      <div className="relative p-6 sm:p-8">
        <h2 id={titleId} className="text-display-3 font-bold text-white">{title}</h2>
        <p className="mb-6 mt-2 text-body text-brand-blue-tint">{subtitle}</p>
        <LeadForm formId={formId} />
      </div>
    </div>
  );
}
