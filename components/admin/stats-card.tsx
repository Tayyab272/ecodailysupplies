// components/admin/stats-card.tsx
import { cn } from "@/lib/utils";
import { DASHBOARD_COLORS } from "@/lib/constants";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "quinary"
    | "senary"
    | "septenary"
    | "octonary"
    | "nonary"
    | "denary";
}

export function StatsCard({
  title,
  value,
  icon,
  className,
  color = "primary",
}: StatsCardProps) {
  const accent = DASHBOARD_COLORS[color];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
    >
      {/* Accent bar */}
      <div className={cn("absolute inset-x-1 top-0 h-1.5", accent)} />

      {/* Subtle background shape */}
      {/* <div className="pointer-events-none absolute -right-14 -bottom-14 h-44 w-44 rounded-full bg-gray-300" /> */}

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Content */}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </p>
            <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              {value}
            </p>
          </div>

          {/* Icon tile */}
          <div
            className={cn(
              "shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-white shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110",
              accent
            )}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white p-5 sm:p-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gray-200" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
