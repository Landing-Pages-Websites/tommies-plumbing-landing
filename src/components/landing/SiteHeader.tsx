import { Phone } from "lucide-react";
import Image from "next/image";
import type { ReactElement } from "react";
import { BookButton } from "@/components/landing/BookButton";
import { PhoneButton } from "@/components/landing/PhoneButton";
import { BUTTON_STYLES } from "@/lib/button-styles";
import { BRAND_NAME, HERO_FORM_ANCHOR, PHONE_HREF, PHONE_LABEL } from "@/lib/site-config";

/** Fixed logo + call/book header — no navigation links by design. */
export function SiteHeader(): ReactElement {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div aria-hidden="true" className="h-1 bg-brand-red" />
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-6 sm:h-20">
        <a href="#hero" aria-label={`${BRAND_NAME} — back to top`} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4">
          <Image src="/brand/tommies-logo-hd.png" alt={BRAND_NAME} width={720} height={144} priority className="h-9 w-auto sm:h-12" />
        </a>
        <div className="flex items-center gap-3">
          <a href={PHONE_HREF} aria-label={PHONE_LABEL} className={`${BUTTON_STYLES.ghost} min-h-11 px-3.5 sm:hidden`}>
            <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            <span>Call</span>
          </a>
          <PhoneButton className="hidden sm:inline-flex" />
          <BookButton href={HERO_FORM_ANCHOR} className="hidden lg:inline-flex" />
        </div>
      </div>
    </header>
  );
}
