"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Shared/sidebar";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {getCurrentUser} from "@/lib/auth";
import { hasPermission, PERMISSIONS } from "@/helper/permissions";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const routePermissionMap = {
      "/panel": PERMISSIONS.PANEL_VIEW,
      "/dashboard": PERMISSIONS.DASHBOARD_VIEW,
    };

    const requiredPermission = Object.keys(routePermissionMap)
      .find(route => pathname.startsWith(route));

    if (
      requiredPermission &&
      !hasPermission(user.role, routePermissionMap[requiredPermission])
    ) {

      router.replace(
        hasPermission(user.role, PERMISSIONS.PANEL_VIEW)
          ? "/panel"
          : "/dashboard"
      );
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
