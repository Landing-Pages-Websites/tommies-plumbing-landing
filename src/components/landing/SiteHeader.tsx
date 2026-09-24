import Image from "next/image";
import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { BRAND_NAME, HERO_FORM_ANCHOR } from "@/lib/site-config";

/**
 * Fixed logo + call/book header — no navigation links by design.
 * Overrides use `max-*:` variants: bare `hidden`/`px-*`/`min-h-*` lose the cascade to BUTTON_STYLES' base utilities.
 */
export function SiteHeader(): ReactElement {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div aria-hidden="true" className="h-1 bg-brand-red" />
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-6 sm:h-20">
        <a href="#hero" aria-label={`${BRAND_NAME} — back to top`} className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4">
          <Image src="/brand/tommies-logo-hd.png" alt={BRAND_NAME} width={240} height={48} priority className="h-9 w-[180px] sm:h-12 sm:w-[240px]" />
        </a>
        <div className="flex min-w-0 items-center gap-3">
          <PhoneButton label="Call" className="max-sm:min-h-11 max-sm:px-3.5 sm:hidden" />
          <PhoneButton className="max-sm:hidden" />
          <BookButton href={HERO_FORM_ANCHOR} className="max-lg:hidden" />
        </div>
      </div>
    </header>
  );
}
