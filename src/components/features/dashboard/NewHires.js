"use client";

import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import AvatarStack from "@/components/features/dashboard/AvatarStack";
import { Button } from "@/components/ui/button";
import { isToday } from "@/lib/format";

export default function NewHires({ employees }) {
  const router = useRouter();

  return (
    <AvatarStack employees={employees.filter((employee) => isToday(employee.createdAt))}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/humanresources/employees")}
      >
        <UserPlus /> Personel Ekle
      </Button>
    </AvatarStack>
  );
}
