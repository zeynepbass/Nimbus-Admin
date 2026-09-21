"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarNavGroup from "@/components/layout/SidebarNavGroup";
import UserProfile from "@/components/layout/UserProfile";
import { isVisibleFor, menu } from "@/config/menu";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AppSidebar() {
  const user = useCurrentUser();
  const [openMenu, setOpenMenu] = useState(null);

  const visibleMenu = menu.filter((item) => isVisibleFor(item, user?.role));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#6C120B]">
              Nimbus Admin
            </span>
            <span className="text-xs text-muted-foreground">Enterprise ERP Platform</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
            DEV
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {visibleMenu.map((group) => (
          <SidebarNavGroup
            key={group.id}
            group={group}
            isOpen={openMenu === group.id}
            onToggle={() => setOpenMenu(openMenu === group.id ? null : group.id)}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
