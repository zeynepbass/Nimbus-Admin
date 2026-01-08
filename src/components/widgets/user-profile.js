"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const router = useRouter();
  const handleLogOut = () => {
    router.push("/login");
    localStorage.removeItem("user");
    localStorage.removeItem("lastLogin");
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="h-auto items-start gap-3">
          <Image
            src="/avatar.png"
            alt="User"
            width={36}
            height={36}
            className="rounded-full"
          />

          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">Zeynep Baş</span>
            <span className="text-xs text-muted-foreground">
              zeynep@mail.com
            </span>
          </div>

          <SidebarMenuButton
            tooltip="logout"
            className="flex items-center justify-end w-full outline-none"
            onClick={handleLogOut}
          >
            <LogOut />
          </SidebarMenuButton>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <div className="flex gap-1">
          <SidebarMenuButton tooltip="Settings">
            <DropdownMenu>
              <DropdownMenuTrigger></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
