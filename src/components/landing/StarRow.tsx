import { Star } from "lucide-react";
import type { ReactElement } from "react";

const STAR_COUNT = 5;

interface StarRowProps {
  className?: string;
}

/** Decorative five-star row; the numeric rating is always stated in adjacent text. */
export function StarRow({ className = "h-4 w-4" }: StarRowProps): ReactElement {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-0.5">
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <Star key={index} className={`${className} fill-star text-star`} strokeWidth={1.75} />
      ))}
    </span>
  );
}
