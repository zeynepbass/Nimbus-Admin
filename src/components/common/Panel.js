import { cn } from "@/lib/utils";

export default function Panel({ title, description, className, children }) {
  return (
    <div className={cn("bg-zinc-100 rounded-2xl shadow-sm p-5", className)}>
      {title && <h3 className="text-sm font-bold text-gray-600 mb-4">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground pb-3 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
