import { ArrowRight, LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";
import { BUTTON_STYLES } from "@/lib/button-styles";
import { PRIMARY_CTA } from "@/lib/site-config";

interface SubmitButtonProps {
  busy: boolean;
  onClick: () => void;
}

/** type="button" by design: the click validates first, then posts the lead directly (no native submit event). */
export function SubmitButton({ busy, onClick }: SubmitButtonProps): ReactElement {
  return (
    <button type="button" onClick={onClick} disabled={busy} aria-busy={busy} className={`group w-full ${BUTTON_STYLES.primaryOnDark} min-h-14 text-lg`}>
      {busy ? (
        <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" strokeWidth={1.75} />
      ) : null}
      <span>{busy ? "Sending your request…" : PRIMARY_CTA}</span>
      {busy ? null : (
        <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.75} />
      )}
    </button>
  );
}
