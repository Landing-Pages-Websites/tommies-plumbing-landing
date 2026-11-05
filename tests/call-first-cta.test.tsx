import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DualCta } from "@/components/landing/DualCta";
import { HeroCopy } from "@/components/landing/HeroCopy";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SERVICES } from "@/lib/content";
import { HERO_FORM_ANCHOR, PHONE_DISPLAY, PHONE_HREF, PHONE_LABEL } from "@/lib/site-config";

const BOOK_LABEL = "Book Plumbing Service";
const FILLED_RED = "bg-brand-red";
const OUTLINED = "border-brand-navy";
const HERO_H1 = "Need a Local Plumber?";
const HERO_BODY =
  "Serving homeowners from Morristown to Bristol. Call Tommie's Plumbing for water heater service, repipes, burst pipes or leaks. Locally owned, plumbing-only service with 30+ years in the trade.";
const HIDDEN_CLASS = /(^|\s)(max-\w+:)?hidden(\s|$)/;
const OFFSITE_AD_NUMBER = /4232002342|423[-.) ]*200[-. ]*2342/;
const SRC_DIR = path.resolve(import.meta.dirname, "../src");

afterEach(cleanup);

function actionLinks(scope: HTMLElement): HTMLAnchorElement[] {
  return Array.from(scope.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"], a[href^="#hero-form"]'));
}

function expectCallFirst(scope: HTMLElement): void {
  const links = actionLinks(scope);
  expect(links).toHaveLength(2);
  const [phone, book] = links;
  expect(phone.getAttribute("href")).toBe(PHONE_HREF);
  expect(phone.getAttribute("aria-label")).toBe(PHONE_LABEL);
  expect(phone.textContent).toContain("Call Now");
  expect(phone.className).toContain(FILLED_RED);
  expect(book.getAttribute("href")).toBe(HERO_FORM_ANCHOR);
  expect(book.textContent).toBe(BOOK_LABEL);
  expect(book.className).toContain(OUTLINED);
  expect(book.className).not.toContain(FILLED_RED);
}

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? listSourceFiles(full) : [full];
  });
}

describe("header call-first CTAs", () => {
  it("puts a filled Call Now phone action before an outlined booking action", () => {
    const { container } = render(<SiteHeader />);
    expectCallFirst(container);
  });

  it("keeps the CTM-swappable number in the phone label and never hides the booking action", () => {
    const { container } = render(<SiteHeader />);
    const [phone, book] = actionLinks(container);
    expect(phone.textContent).toContain(PHONE_DISPLAY);
    expect(book.className).not.toMatch(HIDDEN_CLASS);
    expect(phone.className).not.toMatch(HIDDEN_CLASS);
  });
});

describe("hero", () => {
  it("renders the exact headline and supporting paragraph", () => {
    render(<HeroCopy />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe(HERO_H1);
    expect(heading.children).toHaveLength(0);
    expect(screen.getByText(HERO_BODY)).toBeTruthy();
  });

  it("puts a filled Call Now phone action with the number before the outlined booking action", () => {
    const { container } = render(<HeroCopy />);
    expectCallFirst(container);
    const [phone, book] = actionLinks(container);
    expect(phone.textContent).toBe(`Call Now ${PHONE_DISPLAY}`);
    expect(book.className).not.toMatch(HIDDEN_CLASS);
  });
});

describe("section CTA defaults stay unchanged", () => {
  it("keeps the red booking primary and the outlined Call <number> secondary", () => {
    const { container } = render(<DualCta />);
    const book = within(container).getByRole("link", { name: BOOK_LABEL });
    const phone = within(container).getByRole("link", { name: PHONE_LABEL });
    expect(book.className).toContain(FILLED_RED);
    expect(phone.className).toContain(OUTLINED);
    expect(phone.className).not.toContain(FILLED_RED);
    expect(phone.textContent).toBe(`Call ${PHONE_DISPLAY}`);
  });
});

describe("emergency service card", () => {
  it("uses the exact requested heading and paragraph and keeps its points and image", () => {
    const card = SERVICES.find((service) => service.id === "busted-pipes");
    expect(card?.title).toBe("Burst Pipe or Urgent Leak?");
    expect(card?.body).toBe(
      "Call Tommie's Plumbing for help with a burst or leaking pipe. Tell us what's happening, or send a service request online.",
    );
    expect(card?.points).toEqual(["Burst and leaking supply lines", "Call now or book online"]);
    expect(card?.image.src).toBe("/brand/photos/burst-pipe-repair.jpg");
    expect(SERVICES.map((service) => service.id)).toEqual(["water-heaters", "repipes", "busted-pipes"]);
  });

  it("adds no 24/7, guaranteed-arrival or same-day claims", () => {
    const copy = SERVICES.map((service) => `${service.title} ${service.body}`).join(" ");
    expect(copy).not.toMatch(/24\/7|guarantee|same[- ]day/i);
  });
});

describe("phone number safety", () => {
  it("never places the offsite Google ad number anywhere in source", () => {
    const offenders = listSourceFiles(SRC_DIR).filter((file) => OFFSITE_AD_NUMBER.test(readFileSync(file, "latin1")));
    expect(offenders).toEqual([]);
  });

  it("uses only the authored tel target", () => {
    const { container } = render(<><SiteHeader /><HeroCopy /></>);
    const hrefs = Array.from(container.querySelectorAll('a[href^="tel:"]'), (a) => a.getAttribute("href"));
    expect(new Set(hrefs)).toEqual(new Set([PHONE_HREF]));
  });
});
