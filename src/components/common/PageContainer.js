import { cn } from "@/lib/utils";

export default function PageContainer({ className, children }) {
  return (
    <div className={cn("p-6 space-y-8 bg-gray-50 min-h-screen", className)}>
      {children}
    </div>
  );
}
