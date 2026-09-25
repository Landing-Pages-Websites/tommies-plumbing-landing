import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { LeadForm } from "@/components/landing/LeadForm";

type TestWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  MegaTag?: { trackEvent: Mock };
};

const HERO_FORM_ID = "hero-form-lead";
const FINAL_FORM_ID = "final-form-lead";
const SUBMIT_NAME = /book plumbing service/i;
const ERROR_TITLE = /didn't go through/i;
const SUCCESS_TITLE = /your request is in/i;

let fetchMock: Mock;
let nativeSubmits: Mock;
let trackEvent: Mock;

function renderForms(): { hero: HTMLElement; final: HTMLElement } {
  const { container } = render(
    <>
      <div data-testid={HERO_FORM_ID}><LeadForm formId={HERO_FORM_ID} /></div>
      <div data-testid={FINAL_FORM_ID}><LeadForm formId={FINAL_FORM_ID} /></div>
    </>,
  );
  const get = (id: string): HTMLElement => container.querySelector<HTMLElement>(`[data-testid="${id}"]`) as HTMLElement;
  return { hero: get(HERO_FORM_ID), final: get(FINAL_FORM_ID) };
}

async function fillLead(user: UserEvent, scope: HTMLElement): Promise<void> {
  const q = within(scope);
  await user.type(q.getByLabelText("First name"), "Qa");
  await user.type(q.getByLabelText("Last name"), "Sentinel");
  await user.type(q.getByLabelText("Email"), "qa@example.com");
  await user.type(q.getByLabelText("Phone"), "+15555550100");
  await user.click(q.getByLabelText("Yes"));
}

function formSubmitPushes(): Record<string, unknown>[] {
  return ((window as TestWindow).dataLayer ?? []).filter((entry) => entry.event === "form_submit");
}

function respondWith(body: string, status: number): void {
  fetchMock.mockResolvedValue(new Response(body, { status }));
}

function expectNoConversion(): void {
  expect(trackEvent).not.toHaveBeenCalled();
  expect(formSubmitPushes()).toHaveLength(0);
  expect(nativeSubmits).not.toHaveBeenCalled();
}

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  trackEvent = vi.fn();
  (window as TestWindow).MegaTag = { trackEvent };
  (window as TestWindow).dataLayer = [];
  // Stands in for the Mega optimizer's document-level capture listener.
  nativeSubmits = vi.fn();
  document.addEventListener("submit", nativeSubmits, true);
});

afterEach(() => {
  cleanup();
  document.removeEventListener("submit", nativeSubmits, true);
  vi.unstubAllGlobals();
});

describe("phone field", () => {
  it("renders the +1 QA sentinel as (555) 555-0100 when typed and when pasted", async () => {
    const user = userEvent.setup();
    const { hero } = renderForms();
    const phone = within(hero).getByLabelText<HTMLInputElement>("Phone");
    await user.type(phone, "+15555550100");
    expect(phone.value).toBe("(555) 555-0100");
    await user.clear(phone);
    await user.click(phone);
    await user.paste("+15555550100");
    expect(phone.value).toBe("(555) 555-0100");
  });

  it("keeps extra digits visible and blocks submission instead of dropping them", async () => {
    const user = userEvent.setup();
    const { hero } = renderForms();
    await fillLead(user, hero);
    const phone = within(hero).getByLabelText<HTMLInputElement>("Phone");
    await user.type(phone, "9");
    expect(phone.value).toBe("55555501009");
    await user.click(within(hero).getByRole("button", { name: SUBMIT_NAME }));
    expect(within(hero).getByText("Enter a 10-digit US phone number.")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("lead submission", () => {
  it.each([
    ["HTTP 500", "server error", 500],
    ["empty 2xx", "", 200],
    ["non-JSON 2xx", "<html>ok</html>", 200],
    ["2xx ok:false", JSON.stringify({ ok: false }), 200],
  ])("%s produces zero optimizer and conversion events", async (_label, body, status) => {
    respondWith(body, status);
    const user = userEvent.setup();
    const { hero } = renderForms();
    await fillLead(user, hero);
    await user.click(within(hero).getByRole("button", { name: SUBMIT_NAME }));
    await within(hero).findByText(ERROR_TITLE);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expectNoConversion();
  });

  it("an accepted lead fires exactly one MegaTag and one dataLayer form_submit, with a 10-digit phone", async () => {
    respondWith(JSON.stringify({ ok: true, id: "test" }), 200);
    const user = userEvent.setup();
    const { hero } = renderForms();
    await fillLead(user, hero);
    await user.click(within(hero).getByRole("button", { name: SUBMIT_NAME }));
    await within(hero).findByText(SUCCESS_TITLE);
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string) as { form_data: Record<string, string> };
    expect(payload.form_data).toEqual({ firstName: "Qa", lastName: "Sentinel", email: "qa@example.com", phone: "5555550100", homeowner: "yes", qualificationStatus: "qualified" });
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent.mock.calls[0][0]).toBe("form_submit");
    expect(formSubmitPushes()).toHaveLength(1);
    expect(nativeSubmits).not.toHaveBeenCalled();
  });

  it("rapid clicks across both forms send one lead request", async () => {
    let resolve: (response: Response) => void = () => undefined;
    fetchMock.mockReturnValue(new Promise<Response>((done) => { resolve = done; }));
    const user = userEvent.setup();
    const { hero, final } = renderForms();
    await fillLead(user, hero);
    await fillLead(user, final);
    const heroButton = within(hero).getByRole("button", { name: SUBMIT_NAME });
    const finalButton = within(final).getByRole("button", { name: SUBMIT_NAME });
    for (const button of [heroButton, heroButton, heroButton, finalButton, finalButton]) fireEvent.click(button);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await within(hero).findByText(SUCCESS_TITLE);
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(formSubmitPushes()).toHaveLength(1);
  });
});

describe("keyboard", () => {
  it("Enter on a valid form submits through the validate-first path without a native submit event", async () => {
    respondWith(JSON.stringify({ ok: true }), 200);
    const user = userEvent.setup();
    const { hero } = renderForms();
    await fillLead(user, hero);
    await user.type(within(hero).getByLabelText("Email"), "{Enter}");
    await within(hero).findByText(SUCCESS_TITLE);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(nativeSubmits).not.toHaveBeenCalled();
  });

  it("Enter on an invalid form shows errors, focuses the first invalid field, and sends nothing", async () => {
    const user = userEvent.setup();
    renderForms();
    const [firstName] = screen.getAllByLabelText("First name");
    await user.type(firstName, "Qa{Enter}");
    expect(screen.getByText("Enter your last name.")).toBeTruthy();
    expect(document.activeElement).toBe(screen.getAllByLabelText("Last name")[0]);
    expect(fetchMock).not.toHaveBeenCalled();
    expectNoConversion();
  });
});
