"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser, getRedirectPath } from "@/lib/auth";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const redirectPath = getRedirectPath(getCurrentUser(), pathname);

    if (redirectPath) {
      router.replace(redirectPath);
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <Header />

          <main className="flex-1 overflow-auto">{children}</main>
          <footer className="text-right text-gray-400 p-3 text-sm">
            Nimbus Admin © 2026 · Role-based Access · Audit Ready
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
