"use client";

import { useRef, type ChangeEvent, type ClipboardEvent, type CompositionEvent } from "react";
import { caretAfterDigit, countDigitsBefore, isPunctuationOnlyDelete, isTypedOverflow, removeNeighborDigit } from "@/lib/phone-input";
import { extractDigits, parsePhoneInput, phoneOverflowMessage, type PhoneEditSource, type PhoneInputResult } from "@/lib/phone";

interface PhoneEdit {
  candidate: string;
  caretDigits: number;
  source: PhoneEditSource;
}

interface UsePhoneInputOptions {
  value: string;
  onValueChange: (name: "phone", value: string) => void;
  onReject: (message: string) => void;
}

interface UsePhoneInputReturn {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  handleCompositionStart: () => void;
  handleCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => void;
}

const TYPED_INPUT = new Set(["insertText", "insertCompositionText"]);

// Runs after React commits the new value (or restores the old one), which moves the caret to the end.
function placeCaret(input: HTMLInputElement, caret: number): void {
  queueMicrotask(() => {
    if (document.activeElement === input) input.setSelectionRange(caret, caret);
  });
}

function readChange(previous: string, raw: string, caret: number, inputType: string): PhoneEdit {
  const source: PhoneEditSource = TYPED_INPUT.has(inputType) ? "typed" : "replaced";
  if (isPunctuationOnlyDelete(previous, raw, inputType)) return { ...removeNeighborDigit(raw, caret, inputType.endsWith("Forward")), source };
  return { candidate: raw, caretDigits: countDigitsBefore(raw, caret), source };
}

/**
 * Controlled US phone input. Every edit (keystroke, paste, autofill, IME commit) is checked as a whole
 * candidate: accepted edits are formatted, and over-long ones are rejected whole — the previous value
 * stays and onReject explains why. maxLength is deliberately unset: 14 characters would cut off a typed
 * or pasted +1 number, and this gate already bounds the value.
 */
export function usePhoneInput({ value, onValueChange, onReject }: UsePhoneInputOptions): UsePhoneInputReturn {
  const beforeComposition = useRef<string | null>(null);

  const commit = (input: HTMLInputElement, edit: PhoneEdit, previous: string): void => {
    const overflow = edit.source === "typed" && isTypedOverflow(previous, edit.candidate);
    const result: PhoneInputResult = overflow ? { accepted: false, digitCount: extractDigits(edit.candidate).length } : parsePhoneInput(edit.candidate);
    const shown = result.accepted ? result.value : previous;
    // A deliberate paste counts as an edit even when it leaves the number unchanged, so it clears a stale notice.
    if (shown !== value || (result.accepted && edit.source === "pasted")) onValueChange("phone", shown);
    if (!result.accepted) onReject(phoneOverflowMessage(edit.source, result.digitCount));
    const droppedDigits = extractDigits(edit.candidate).length - extractDigits(shown).length;
    placeCaret(input, caretAfterDigit(shown, edit.caretDigits - droppedDigits));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.currentTarget;
    const native = event.nativeEvent as Partial<InputEvent>;
    // Mid-composition text is held raw; handleCompositionEnd checks the committed result.
    if (native.isComposing) return onValueChange("phone", input.value);
    const caret = input.selectionStart ?? input.value.length;
    commit(input, readChange(value, input.value, caret, native.inputType ?? ""), value);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const input = event.currentTarget;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    const head = input.value.slice(0, start) + event.clipboardData.getData("text");
    const edit: PhoneEdit = { candidate: head + input.value.slice(end), caretDigits: extractDigits(head).length, source: "pasted" };
    commit(input, edit, value);
  };

  const handleCompositionStart = (): void => {
    beforeComposition.current = value;
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>): void => {
    const input = event.currentTarget;
    const previous = beforeComposition.current ?? value;
    beforeComposition.current = null;
    const caret = input.selectionStart ?? input.value.length;
    commit(input, { candidate: input.value, caretDigits: countDigitsBefore(input.value, caret), source: "typed" }, previous);
  };

  return { handleChange, handlePaste, handleCompositionStart, handleCompositionEnd };
}
