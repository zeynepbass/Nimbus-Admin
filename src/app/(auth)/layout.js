 "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { roles } from "@/helper/role";

export default function LoginLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
  
    if (!user) {
      setChecking(false);
      return;
    }
  
    router.replace(
      user.role === roles.ADMIN ? "/panel" : "/dashboard/summary"
    );
  }, [router]);
  

  if (checking) return null; 

  return <>{children}</>;
}