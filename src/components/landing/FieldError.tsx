import { CircleAlert } from "lucide-react";
import type { ReactElement } from "react";

interface FieldErrorProps {
  id: string;
  message?: string;
}

export function FieldError({ id, message }: FieldErrorProps): ReactElement | null {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-fine font-medium text-error-tint">
      <CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      {message}
    </p>
  );
}
