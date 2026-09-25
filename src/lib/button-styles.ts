const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-btn px-5 py-3 font-body text-[1.0625rem] font-bold leading-none tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:bg-disabled disabled:text-white/80 disabled:shadow-none";

export const BUTTON_STYLES = {
  primary: `${BASE} bg-brand-red text-white shadow-[0_8px_20px_-10px_rgb(218_56_77/0.8)] hover:bg-brand-red-hover active:bg-brand-red-active focus-visible:ring-brand-navy focus-visible:ring-offset-canvas`,
  navy: `${BASE} bg-brand-navy text-white hover:bg-brand-navy-hover active:bg-brand-navy-active focus-visible:ring-brand-navy focus-visible:ring-offset-white`,
  ghost: `${BASE} border-2 border-brand-navy bg-white text-brand-navy hover:bg-brand-blue-wash active:bg-brand-blue-tint focus-visible:ring-brand-navy focus-visible:ring-offset-canvas`,
  ghostOnDark: `${BASE} border-2 border-white/85 bg-white/5 text-white hover:bg-white hover:text-brand-navy active:bg-brand-blue-tint active:text-brand-navy focus-visible:ring-white focus-visible:ring-offset-brand-navy`,
  primaryOnDark: `${BASE} bg-brand-red text-white shadow-[0_10px_24px_-12px_rgb(0_0_0/0.6)] hover:bg-brand-red-hover active:bg-brand-red-active focus-visible:ring-white focus-visible:ring-offset-brand-navy`,
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES;
