import type { LucideIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

interface StatCardProps {
  icon: LucideIcon;
  iconClassName?: string;
  value: ReactNode;
  valueClassName: string;
  label: string;
}

export function StatCard({ icon: Icon, iconClassName = "text-brand-blue", value, valueClassName, label }: StatCardProps): ReactElement {
  return (
    <div className="flex h-full flex-col gap-3 rounded-card border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-150 hover:border-white/30">
      <Icon aria-hidden="true" className={`h-8 w-8 ${iconClassName}`} strokeWidth={1.75} />
      <p className={`font-display font-bold ${valueClassName}`}>{value}</p>
      <p className="text-brand-blue-tint">{label}</p>
    </div>
  );
}
