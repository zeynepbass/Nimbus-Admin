"use client";

import { useState } from "react";
import SidebarNavGroup from "@/components/layout/SidebarNavGroup";
import UserProfile from "@/components/layout/UserProfile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { menuConfig } from "@/config/menu.config";

export default function AppSidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#6C120B]">
              Nimbus Admin
            </span>
            <span className="text-xs text-muted-foreground">
              Enterprise ERP Platform
            </span>
          </div>

          <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
            DEV
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuConfig.map((group) => (
          <SidebarNavGroup
            key={group.id}
            group={group}
            isOpen={openMenu === group.label}
            onToggle={() =>
              setOpenMenu(openMenu === group.label ? null : group.label)
            }
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
