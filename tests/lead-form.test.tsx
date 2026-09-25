import { cleanup, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { LeadForm } from "@/components/landing/LeadForm";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

type TestWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  MegaTag?: { trackEvent: Mock };
};

const HERO_FORM_ID = "hero-form-lead";
const FINAL_FORM_ID = "final-form-lead";
const SUBMIT_NAME = /book plumbing service/i;
const ERROR_TITLE = /didn't go through/i;
const SUCCESS_TITLE = /your request is in/i;
const QA_SENTINEL = "+15555550100";

let fetchMock: Mock;
let nativeSubmits: Mock;
let trackEvent: Mock;
let sendBeacon: Mock;

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
  await user.type(q.getByLabelText("Phone"), QA_SENTINEL);
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
  expect(sendBeacon).not.toHaveBeenCalled();
}

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  trackEvent = vi.fn();
  (window as TestWindow).MegaTag = { trackEvent };
  (window as TestWindow).dataLayer = [];
  sendBeacon = vi.fn(() => true);
  Object.defineProperty(navigator, "sendBeacon", { value: sendBeacon, configurable: true });
  // Stands in for the Mega optimizer's document-level capture listener.
  nativeSubmits = vi.fn();
  document.addEventListener("submit", nativeSubmits, true);
});

afterEach(() => {
  cleanup();
  document.removeEventListener("submit", nativeSubmits, true);
  vi.unstubAllGlobals();
});

const TYPED_OVERLONG = "52334242324444444";
const TYPED_MAX = /phone numbers are 10 digits/i;
const PASTED_MAX = /pasted number has 17 digits/i;
const INVALID_PHONE = "Enter a 10-digit US phone number.";

function phoneIn(scope: HTMLElement): HTMLInputElement {
  return within(scope).getByLabelText<HTMLInputElement>("Phone");
}

describe.each([HERO_FORM_ID, FINAL_FORM_ID])("phone field (%s)", (formId) => {
  const scopeOf = (forms: { hero: HTMLElement; final: HTMLElement }): HTMLElement => (formId === HERO_FORM_ID ? forms.hero : forms.final);

  it("formats a normal 10-digit number and the +1 QA sentinel, typed or pasted", async () => {
    const user = userEvent.setup();
    const phone = phoneIn(scopeOf(renderForms()));
    await user.type(phone, "4236383662");
    expect(phone.value).toBe("(423) 638-3662");
    await user.clear(phone);
    await user.type(phone, QA_SENTINEL);
    expect(phone.value).toBe("(555) 555-0100");
    await user.clear(phone);
    await user.click(phone);
    await user.paste(QA_SENTINEL);
    expect(phone.value).toBe("(555) 555-0100");
    expect(phone.getAttribute("aria-invalid")).toBe("false");
  });

  it("typed overflow: extra digits never appear, the maximum is shown, and submit is blocked", async () => {
    const user = userEvent.setup();
    const scope = scopeOf(renderForms());
    await fillLead(user, scope);
    const phone = phoneIn(scope);
    await user.clear(phone);
    await user.type(phone, TYPED_OVERLONG);
    expect(phone.value).toBe("(523) 342-4232");
    expect(within(scope).getByRole("alert").textContent).toMatch(TYPED_MAX);
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    await user.click(within(scope).getByRole("button", { name: SUBMIT_NAME }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(phone);
    expectNoConversion();
  });

  it("typed overflow clears once the visitor edits the number", async () => {
    const user = userEvent.setup();
    const phone = phoneIn(scopeOf(renderForms()));
    await user.type(phone, "42363836629");
    expect(phone.value).toBe("(423) 638-3662");
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    await user.type(phone, "{Backspace}2");
    expect(phone.value).toBe("(423) 638-3662");
    expect(phone.getAttribute("aria-invalid")).toBe("false");
  });

  it("pasted overflow into an empty field is rejected whole, with nothing inserted", async () => {
    const user = userEvent.setup();
    const scope = scopeOf(renderForms());
    await fillLead(user, scope);
    const phone = phoneIn(scope);
    await user.clear(phone);
    await user.paste(TYPED_OVERLONG);
    expect(phone.value).toBe("");
    expect(within(scope).getByRole("alert").textContent).toMatch(PASTED_MAX);
    await user.click(within(scope).getByRole("button", { name: SUBMIT_NAME }));
    expect(fetchMock).not.toHaveBeenCalled();
    expectNoConversion();
  });

  it("pasted overflow keeps the previous value instead of slicing to a new number", async () => {
    const user = userEvent.setup();
    const phone = phoneIn(scopeOf(renderForms()));
    await user.type(phone, "4236383662");
    await user.paste(TYPED_OVERLONG);
    expect(phone.value).toBe("(423) 638-3662");
    phone.setSelectionRange(0, phone.value.length);
    await user.paste("25555550100"); // 11 digits without a leading 1: ambiguous, rejected
    expect(phone.value).toBe("(423) 638-3662");
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    phone.setSelectionRange(0, phone.value.length);
    await user.paste(QA_SENTINEL);
    expect(phone.value).toBe("(555) 555-0100");
    expect(phone.getAttribute("aria-invalid")).toBe("false");
  });

  it("re-pasting a valid number clears a rejected-paste notice even if the digits are unchanged", async () => {
    const user = userEvent.setup();
    const phone = phoneIn(scopeOf(renderForms()));
    await user.type(phone, "4236383662");
    await user.paste(TYPED_OVERLONG);
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    phone.setSelectionRange(0, phone.value.length);
    await user.paste("4236383662");
    expect(phone.value).toBe("(423) 638-3662");
    expect(phone.getAttribute("aria-invalid")).toBe("false");
  });

  it("a 1 typed in front of a complete number is refused with the maximum message", async () => {
    const user = userEvent.setup();
    const phone = phoneIn(scopeOf(renderForms()));
    await user.type(phone, "4236383662");
    await user.type(phone, "1", { initialSelectionStart: 0, initialSelectionEnd: 0 });
    expect(phone.value).toBe("(423) 638-3662");
    expect(phone.getAttribute("aria-invalid")).toBe("true");
  });

  it("an over-long autofill/replacement is rejected whole", () => {
    const phone = phoneIn(scopeOf(renderForms()));
    fireEvent.change(phone, { target: { value: TYPED_OVERLONG } });
    expect(phone.value).toBe("");
    expect(phone.getAttribute("aria-invalid")).toBe("true");
  });

  it("empty and incomplete submits show inline errors and send nothing", async () => {
    const user = userEvent.setup();
    const scope = scopeOf(renderForms());
    const submit = within(scope).getByRole("button", { name: SUBMIT_NAME });
    await user.click(submit);
    expect(within(scope).getByText("Enter your first name.")).toBeTruthy();
    expect(within(scope).getByText(INVALID_PHONE)).toBeTruthy();
    await user.type(phoneIn(scope), "42363");
    await user.click(submit);
    expect(within(scope).getByText(INVALID_PHONE)).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    expectNoConversion();
  });
});

describe("API payload guard", () => {
  const lead = { firstName: "Qa", lastName: "Sentinel", email: "qa@example.com", homeowner: "yes", qualificationStatus: "qualified" } as const;

  it.each([TYPED_OVERLONG, "25555550100", QA_SENTINEL, ""])("refuses to post phone %j that is not exactly 10 digits", async (phone) => {
    const { result } = renderHook(() => useMegaLeadForm());
    await expect(result.current.submit({ ...lead, phone })).rejects.toThrow(/10-digit/);
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

  it("the final form's HTTP 500 also produces zero conversion events or beacons", async () => {
    respondWith("server error", 500);
    const user = userEvent.setup();
    const { final } = renderForms();
    await fillLead(user, final);
    await user.click(within(final).getByRole("button", { name: SUBMIT_NAME }));
    await within(final).findByText(ERROR_TITLE);
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
