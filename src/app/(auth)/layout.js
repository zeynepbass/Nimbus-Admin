"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getHomePath } from "@/lib/auth";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      router.replace(getHomePath(user));
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) return null;

  return children;
}
