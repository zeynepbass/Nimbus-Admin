"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { UserProfile } from "../widgets/user-profile"
import { ChevronDown } from "lucide-react"
import { menuConfig } from "@/config/menu.config"

export default function AppSidebar() {
  const [openMenu, setOpenMenu] = useState(null)

  const filteredMenu = menuConfig.filter(
    (menu) => menu.roles?.includes("user")
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
  <div className="flex items-center justify-between px-2 py-1">
    <div className="flex flex-col">
      <span className="text-sm font-semibold tracking-tight">
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
        {filteredMenu.map((group) => {
          const Icon = group.icon
          const isOpen = openMenu === group.label

          return (
            <SidebarGroup key={group.id}>
              <SidebarMenu>
        
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={group.label}
                    onClick={() =>
                      group.children &&
                      setOpenMenu(isOpen ? null : group.label)
                    }
                    asChild={!group.children && !!group.href}
                  >
                    {group.href ? (
                      <Link href={group.href}>
                        <Icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {group.label}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <Icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {group.label}
                        </span>

                        {group.children && (
                          <ChevronDown
                            className={`
                              ml-auto transition
                              ${isOpen ? "rotate-180" : ""}
                              group-data-[collapsible=icon]:hidden
                            `}
                          />
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>


                {isOpen &&
                  group.children?.map((item) => {
                    const ChildIcon = item.icon
                    return (
                      <SidebarMenuItem
                        key={item.label}
                        className="ml-8 group-data-[collapsible=icon]:hidden"
                      >
                        <SidebarMenuButton asChild>
                          <Link href={item.href}>
                            <ChildIcon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
              </SidebarMenu>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
