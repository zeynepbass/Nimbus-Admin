"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image"
export function UserProfile() {
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
          <SidebarMenuButton tooltip="logout"  className="pl-10" >
          <LogOut />
          </SidebarMenuButton>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <div className="flex gap-1">



          <SidebarMenuButton tooltip="Settings">
            <DropdownMenu>
              <DropdownMenuTrigger>
              <Settings />
 
              </DropdownMenuTrigger>
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
