import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GOOGLE_ADS_DESTINATION_ID, GOOGLE_ADS_DESTINATION_SCRIPT } from "@/lib/google-ads-destination";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __googleAdsDestination?: string;
};

const LEGACY_AW = "AW-11391344729";
const BASELINE_ENTRIES = [["js", new Date(0)], ["config", LEGACY_AW]];
const win = window as GtagWindow;

function runTag(): void {
  new Function(GOOGLE_ADS_DESTINATION_SCRIPT)();
}

function destinationConfigs(): unknown[] {
  return (win.dataLayer ?? []).filter((entry) => {
    const args = Array.from(entry as ArrayLike<unknown>);
    return args[0] === "config" && args[1] === GOOGLE_ADS_DESTINATION_ID;
  });
}

beforeEach(() => {
  win.dataLayer = [...BASELINE_ENTRIES];
});

afterEach(() => {
  delete win.dataLayer;
  delete win.gtag;
  delete win.__googleAdsDestination;
});

describe("Google Ads destination config", () => {
  it("queues one Arguments-shaped config into the existing dataLayer before gtag is ready", () => {
    const existing = win.dataLayer;
    runTag();
    expect(win.dataLayer).toBe(existing);
    expect(win.dataLayer?.slice(0, 2)).toEqual(BASELINE_ENTRIES);
    expect(win.dataLayer).toHaveLength(3);
    const queued = win.dataLayer?.[2] as IArguments;
    expect(Object.prototype.toString.call(queued)).toBe("[object Arguments]");
    expect(Array.from(queued)).toEqual(["config", GOOGLE_ADS_DESTINATION_ID]);
  });

  it("creates dataLayer when the page has none yet", () => {
    delete win.dataLayer;
    runTag();
    expect(destinationConfigs()).toHaveLength(1);
  });

  it("calls the existing gtag once when it is already defined", () => {
    const gtag = vi.fn();
    win.gtag = gtag;
    runTag();
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("config", GOOGLE_ADS_DESTINATION_ID);
    expect(win.dataLayer).toEqual(BASELINE_ENTRIES);
  });

  it("goes through a wrapped dataLayer.push (GTM semantics)", () => {
    const push = vi.fn((...items: unknown[]) => Array.prototype.push.apply(win.dataLayer, items));
    (win.dataLayer as unknown[]).push = push;
    runTag();
    expect(push).toHaveBeenCalledTimes(1);
    expect(destinationConfigs()).toHaveLength(1);
  });

  it("does not duplicate on re-execution, including after gtag becomes ready", () => {
    runTag();
    runTag();
    const gtag = vi.fn();
    win.gtag = gtag;
    runTag();
    expect(destinationConfigs()).toHaveLength(1);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not duplicate when the destination is already configured in dataLayer", () => {
    win.dataLayer?.push(["config", GOOGLE_ADS_DESTINATION_ID]);
    runTag();
    expect(destinationConfigs()).toHaveLength(1);
  });

  it("only ever adds a config command for the one destination", () => {
    const gtag = vi.fn();
    win.gtag = gtag;
    runTag();
    runTag();
    expect(gtag.mock.calls).toEqual([["config", GOOGLE_ADS_DESTINATION_ID]]);
  });

  it("contains no loader, js command, event, conversion label, or other account id", () => {
    expect(GOOGLE_ADS_DESTINATION_SCRIPT).not.toMatch(/googletagmanager|<script|createElement|src=/);
    expect(GOOGLE_ADS_DESTINATION_SCRIPT).not.toMatch(/"js"|'js'|"event"|'event'|send_to|consent|conversion/);
    expect(GOOGLE_ADS_DESTINATION_SCRIPT.match(/AW-[\w/-]+/g)).toEqual(["AW-11380233464"]);
  });

  it("is rendered once in the root layout head, after the MegaTag config and before the optimizer", () => {
    const layout = readFileSync(path.resolve(import.meta.dirname, "../src/app/layout.tsx"), "utf8");
    expect(layout.match(/GOOGLE_ADS_DESTINATION_SCRIPT \}\}/g)).toHaveLength(1);
    const head = layout.slice(layout.indexOf("<head>"), layout.indexOf("</head>"));
    const megaTag = head.indexOf("MEGA_TAG_SCRIPT");
    const destination = head.indexOf("GOOGLE_ADS_DESTINATION_SCRIPT");
    expect(megaTag).toBeGreaterThan(-1);
    expect(destination).toBeGreaterThan(megaTag);
    expect(head.indexOf("optimizer-script")).toBeGreaterThan(destination);
  });
});
