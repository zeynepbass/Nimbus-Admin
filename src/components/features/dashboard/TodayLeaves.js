"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import AvatarStack from "@/components/features/dashboard/AvatarStack";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const isOnLeaveToday = (employee) => {
  const today = new Date().setHours(0, 0, 0, 0);

  return employee.leaveDates.some(
    (leave) =>
      new Date(leave.from).setHours(0, 0, 0, 0) <= today &&
      today <= new Date(leave.to).setHours(0, 0, 0, 0)
  );
};

export default function TodayLeaves({ employees }) {
  const router = useRouter();

  return (
    <AvatarStack employees={employees.filter(isOnLeaveToday)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/humanresources/employees")}>
            Personel Listesini Gör
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/humanresources/leaves")}>
            İzinleri Gör
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </AvatarStack>
  );
}
