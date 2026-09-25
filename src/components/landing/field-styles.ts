const INPUT_BASE =
  "block w-full min-h-12 rounded-btn border-2 bg-white/[0.07] px-4 py-3 text-body text-white placeholder:text-brand-blue-tint/75 transition-[border-color,box-shadow,background-color] duration-150 ease-brand hover:border-white hover:bg-white/10 focus:border-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-navy disabled:cursor-not-allowed disabled:border-white/30 disabled:bg-white/5 disabled:text-white/50";

export function inputClass(hasError: boolean): string {
  return `${INPUT_BASE} ${hasError ? "border-error-tint" : "border-white/70"}`;
}

export const LABEL_CLASS = "mb-1.5 block text-[0.9375rem] font-semibold text-white";
