"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  ChevronDown,
  LayoutDashboard,
  History,
  Star,
  Database,
  RefreshCcw,
} from "lucide-react"

import { UserProfile } from "@/components/widgets/user-profile"

export function AppSidebar() {
  const [openPlayground, setOpenPlayground] = useState(false)
  const [openData, setOpenData] = useState(false)

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>

        {/* PLATFORM */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>

          <SidebarMenu>


            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setOpenPlayground(!openPlayground)}
              >
                <LayoutDashboard />
                <span>Playground</span>
                <ChevronDown
                  className={`ml-auto transition ${
                    openPlayground ? "rotate-180" : ""
                  }`}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>

            {openPlayground && (
              <SidebarMenu className="ml-8">
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <History />
                    <span>History</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Star />
                    <span>Starred</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarMenu>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel>Models</SidebarGroupLabel>

          <SidebarMenu>


            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setOpenData(!openData)}
              >
                <Database />
                <span>Data Fetching</span>
                <ChevronDown
                  className={`ml-auto transition ${
                    openData ? "rotate-180" : ""
                  }`}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>

            {openData && (
              <SidebarMenu className="ml-8">
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <RefreshCcw />
                    <span>Revalidate</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>


      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
