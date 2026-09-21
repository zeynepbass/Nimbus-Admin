import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function InfoCard({ title, description, fields = [], className, children }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        {fields.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {fields.map(({ label, value, wide }) => (
              <div key={label} className={cn(wide && "md:col-span-4")}>
                <p className="text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
