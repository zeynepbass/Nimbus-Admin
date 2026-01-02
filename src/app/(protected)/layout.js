"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Shared/sidebar";
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

    // ! login değil
    if (!user) {
      router.replace("/login");
      return;
    }

    // USER → dashboard dışında bir yere giremez
    if (user.role === roles.USER && pathname.startsWith("/panel")) {
      router.replace("/dashboard");
      return;
    }

    // ADMIN → dashboard'a giremez
    if (user.role === roles.ADMIN && pathname.startsWith("/dashboard")) {
      router.replace("/panel");
      return;
    }

    // ! her şey uygunsa render edilebilir
    setChecking(false);
  }, [pathname]);

  // ! yetki kontrolü bitmeden HİÇBİR ŞEY GÖSTERME
  if (checking) return null;

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
