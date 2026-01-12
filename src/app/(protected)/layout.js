"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Shared/sidebar";

import Header from "@/components/Shared/header";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { roles } from "@/helper/role";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role === roles.USER && pathname.startsWith("/panel")) {
      router.replace("/dashboard");
      return;
    }

    if (user.role === roles.ADMIN && pathname.startsWith("/dashboard")) {
      router.replace("/panel");
      return;
    }

    setChecking(false);
  }, [pathname]);

  if (checking) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 overflow-auto ">{children}</main>
          <h5 className="text-right text-gray-400 p-3 text-sm">
            Nimbus Admin © 2026 · Role-based Access · Audit Ready
          </h5>
        </div>
      </div>
    </SidebarProvider>
  );
}
