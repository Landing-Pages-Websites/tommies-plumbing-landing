import type { ReactElement } from "react";
import { BRAND_NAME, OFFER_TERMS } from "@/lib/site-config";

const COPYRIGHT_YEAR = 2026;

/** Legal-only footer: no navigation, no social links. */
export function LegalFooter(): ReactElement {
  return (
    <footer className="bg-ink pb-28 pt-8 text-center text-fine text-line sm:pb-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <p>&copy; {COPYRIGHT_YEAR} {BRAND_NAME}. All rights reserved.</p>
        <p className="mt-1">Offers: {OFFER_TERMS}</p>
      </div>
    </footer>
  );
}
