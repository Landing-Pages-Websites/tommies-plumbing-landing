import Image from "next/image";
import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { BRAND_NAME, HERO_FORM_ANCHOR } from "@/lib/site-config";

// Below md the actions take their own 50/50 row under the logo, fixed at 44px so the header height (and the
// hero's top padding that clears it) never depends on whether a label wraps.
const HEADER_MOBILE_FIT =
  "min-w-0 max-md:h-11 max-md:min-h-11 max-md:gap-1.5 max-md:px-2 max-md:py-0 max-md:text-[0.9375rem] max-md:leading-[1.1] max-md:text-center";

/**
 * Fixed logo + call/book header — no navigation links by design. Calling is the primary action, booking secondary.
 * Overrides use `max-*:` variants: bare `hidden`/`px-*`/`min-h-*` lose the cascade to BUTTON_STYLES' base utilities.
 */
export function SiteHeader(): ReactElement {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div aria-hidden="true" className="h-1 bg-brand-red" />
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 px-6 max-sm:pb-2 sm:max-md:pb-3 md:h-20">
        <a href="#hero" aria-label={`${BRAND_NAME} — back to top`} className="flex h-14 shrink-0 items-center rounded-md sm:h-16 md:h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4">
          <Image src="/brand/tommies-logo-hd.png" alt={BRAND_NAME} width={240} height={48} priority className="h-9 w-[180px] sm:h-12 sm:w-[240px]" />
        </a>
        <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:min-w-0 md:items-center md:gap-3">
          <PhoneButton variant="primary" action="Call Now" numberClassName="max-lg:hidden" className={HEADER_MOBILE_FIT} />
          <BookButton href={HERO_FORM_ANCHOR} variant="ghost" className={`${HEADER_MOBILE_FIT} max-md:[&>svg]:hidden`} />
        </div>
      </div>
    </header>
  );
}
