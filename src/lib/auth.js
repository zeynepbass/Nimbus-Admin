"use client";
import users from "@/data/users.json";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("user");
  if (!token) return null;

  return users.find(u => u.email === token) || null;
}
