"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return user;
}
