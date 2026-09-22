import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function InfoCard({
  title,
  description,
  gridded = false,
  className,
  children,
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent
        className={cn(gridded && "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm")}
      >
        {children}
      </CardContent>
    </Card>
  );
}
