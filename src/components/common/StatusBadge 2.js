import { cn } from "@/lib/utils";
import { TONES } from "@/constants/status";

export default function StatusBadge({ tone, dot = false, className, children }) {
  const toneClass = TONES[tone];

  const badge = (
    <span
      className={cn(
        "px-2 py-1 rounded-md text-xs font-medium",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );

  if (!dot) return badge;

  return (
    <div className="flex items-center justify-center gap-2">
      <span className={cn("inline-block h-2 w-2 rounded-full", toneClass)} />
      {badge}
    </div>
  );
}
