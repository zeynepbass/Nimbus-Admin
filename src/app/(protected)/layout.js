"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Shared/sidebar";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {getCurrentUser} from "@/lib/auth";
import { roles } from "@/helper/role";


export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user || !user.email) {
      router.replace("/login");
      return;
    }

    if (user.role === roles.USER && pathname.startsWith("/panel")) {
      router.replace("/dashboard");
    }

    if (user.role === roles.ADMIN && pathname.startsWith("/dashboard")) {
      router.replace("/panel");
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
