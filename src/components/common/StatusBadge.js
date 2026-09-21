import { FALLBACK_STATUS_STYLE, STATUS } from "@/constants/status";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status, label, dot = false, map = STATUS }) {
  const config = map[status];
  const className = config?.className ?? FALLBACK_STATUS_STYLE;
  const text = label ?? config?.label ?? status;

  const badge = (
    <span className={cn("px-2 py-1 rounded-md text-xs font-medium", className)}>
      {text}
    </span>
  );

  if (!dot) return badge;

  return (
    <div className="flex items-center justify-center gap-2">
      <span className={cn("inline-block h-2 w-2 rounded-full", className)} />
      {badge}
    </div>
  );
}
