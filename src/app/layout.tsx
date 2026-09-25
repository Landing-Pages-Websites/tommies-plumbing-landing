import type { Metadata, Viewport } from "next";
import { Baloo_Da_2, Barlow } from "next/font/google";
import Script from "next/script";
import type { ReactElement, ReactNode } from "react";
import { QueryParamPersistence } from "@/components/landing/QueryParamPersistence";
import { TrackingInit } from "@/components/landing/TrackingInit";
import type { TrackingConfig } from "@/hooks/useTracking";
import { MEGA_CONFIG, MEGA_ENDPOINTS, isPlaceholderId } from "@/lib/mega-config";
import { GOOGLE_RATING, PHONE_DISPLAY, YEARS_EXPERIENCE } from "@/lib/site-config";
import "./globals.css";

const baloo = Baloo_Da_2({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-baloo", display: "swap" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-barlow", display: "swap" });

// siteId is read from MEGA_CONFIG.SITE_ID so the tag and the lead form can never disagree.
// The lint reads the siteKey literal. siteKey is filled after `mega site-tracking enable`; until then the optimizer stays off (fail closed).
const MEGA_TAG_CONFIG: TrackingConfig = {
  siteId: MEGA_CONFIG.SITE_ID,
  siteKey: "e34w0qv1g1tocgod",
  gtmId: "GTM-MNZHFKKH",
  pixelId: "858245649089003",
};
const MEGA_TAG_SCRIPT = `window.MEGA_TAG_CONFIG=${JSON.stringify(MEGA_TAG_CONFIG)};window.API_ENDPOINT="${MEGA_ENDPOINTS.OPTIMIZER_API}";window.TRACKING_API_ENDPOINT="${MEGA_ENDPOINTS.TRACKING_API}";`;
const TRACKING_LIVE = !isPlaceholderId(MEGA_TAG_CONFIG.siteKey);

const TITLE = "Book Plumbing Service | Tommie's Plumbing";
const DESCRIPTION = `Locally owned, plumbing-only team with ${YEARS_EXPERIENCE}+ years of experience and a ${GOOGLE_RATING}-star Google rating. Water heaters, tankless, repipes, and busted-pipe repairs from Morristown to Bristol. Call ${PHONE_DISPLAY}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://book.tommiesplumbing.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["/brand/photos/hero.jpg"] },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#001ab3" };

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" className={`${baloo.variable} ${barlow.variable}`}>
      <head>
        <meta name="mega-site-id" content={MEGA_TAG_CONFIG.siteId} />
        <script dangerouslySetInnerHTML={{ __html: MEGA_TAG_SCRIPT }} />
        {/* defer, not async: React hoists async src scripts above the config script, so the optimizer could run before MEGA_TAG_CONFIG exists. */}
        {TRACKING_LIVE ? <script id="optimizer-script" src="https://cdn.gomega.ai/scripts/optimizer.min.js" data-site-id={MEGA_TAG_CONFIG.siteId} defer /> : null}
      </head>
      <body>
        <QueryParamPersistence />
        <TrackingInit config={MEGA_TAG_CONFIG} />
        {children}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
