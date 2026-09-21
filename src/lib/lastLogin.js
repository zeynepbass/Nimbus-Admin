import { STORAGE_KEYS } from "@/constants/storage";
import { readStorage, writeStorage } from "@/lib/storage";

function detectBrowser() {
  const agent = navigator.userAgent;

  if (agent.includes("Chrome")) return "Chrome";
  if (agent.includes("Firefox")) return "Firefox";
  if (agent.includes("Safari")) return "Safari";
  return "Bilinmeyen";
}

export function saveLastLogin() {
  const now = new Date();

  writeStorage(STORAGE_KEYS.LAST_LOGIN, {
    time: now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    date: now.toLocaleDateString("tr-TR"),
    browser: detectBrowser(),
  });
}

export const getLastLogin = () => readStorage(STORAGE_KEYS.LAST_LOGIN);
