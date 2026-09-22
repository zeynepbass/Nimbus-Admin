"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getCurrentUser, logout } from "@/lib/auth";

export default function UserProfile() {
  const router = useRouter();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="h-auto items-start gap-3">
          <div>
            <img
              src={user?.resim}
              alt={user?.name}
              width={36}
              height={36}
              className="rounded-full"
            />

            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>

            <SidebarMenuButton
              tooltip="logout"
              className="flex items-center justify-end w-full outline-none"
              onClick={handleLogout}
            >
              <LogOut />
            </SidebarMenuButton>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
