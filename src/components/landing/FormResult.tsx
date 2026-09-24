import { CircleCheck, PhoneCall, RotateCcw } from "lucide-react";
import type { ReactElement } from "react";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { BUTTON_STYLES } from "@/lib/button-styles";
import type { HomeownerAnswer } from "@/lib/lead-types";

interface FormResultProps {
  outcome: "success" | "error";
  firstName: string;
  homeowner: HomeownerAnswer | "";
  onRetry: () => void;
}

const COPY = {
  qualified: {
    title: "Thanks — your request is in.",
    body: "Tommie's local office will reach out using the phone number or email you shared to talk through the problem and set up a time.",
  },
  notOwner: {
    title: "Thanks — we've got your details.",
    body: "Because you're not the homeowner or property owner, the quickest path is to have the owner reach out so the work can be approved.",
  },
  error: {
    title: "Your request didn't go through.",
    body: "Something went wrong, so nothing was sent. Try again, or call the office and we'll take it from there.",
  },
} as const;

export function FormResult({ outcome, firstName, homeowner, onRetry }: FormResultProps): ReactElement {
  const copy = outcome === "error" ? COPY.error : homeowner === "no" ? COPY.notOwner : COPY.qualified;
  const Icon = outcome === "error" ? PhoneCall : CircleCheck;
  const greeting = outcome === "success" && firstName ? `${firstName}, ` : "";
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-start gap-4 py-2">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-2 ring-white/30">
        <Icon aria-hidden="true" className="h-8 w-8 text-white" strokeWidth={1.75} />
      </span>
      <h3 className="text-display-3 font-bold text-white">
        {greeting}
        {copy.title}
      </h3>
      <p className="text-body text-brand-blue-tint">{copy.body}</p>
      <p className="text-body text-white">Need to talk to someone now?</p>
      <div className="flex flex-wrap gap-3">
        {outcome === "error" ? (
          <button type="button" onClick={onRetry} className={BUTTON_STYLES.primaryOnDark}>
            <RotateCcw aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            Try again
          </button>
        ) : null}
        <PhoneButton variant="ghostOnDark" />
      </div>
    </div>
  );
}
