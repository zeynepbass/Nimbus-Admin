"use client";
import users from "@/data/users.json";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user || null;
}

export function authFormSetting(email, password) {
  const user = users.find(
    item => item.email === email && item.password.toString() === password.toString()
  );

  if (user) {
    const settingUser=users.find((item)=>item.email===user.email)
    localStorage.setItem("user", JSON.stringify(settingUser)); 
    return user;
  }

  return null;
}
