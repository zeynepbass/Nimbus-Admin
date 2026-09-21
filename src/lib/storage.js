const isBrowser = () => typeof window !== "undefined";

export function readStorage(key, fallback = null) {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(...keys) {
  if (!isBrowser()) return;
  keys.forEach((key) => window.localStorage.removeItem(key));
}
