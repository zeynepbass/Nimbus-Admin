import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";

export default function AvatarStack({ employees, children }) {
  return (
    <div className="flex justify-between items-center gap-12">
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {employees.map((employee) => (
          <Avatar key={employee.id}>
            <AvatarImage src={employee.avatar} alt={employee.fullName} />
            <AvatarFallback>{getInitials(employee.fullName)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      {children}
    </div>
  );
}
