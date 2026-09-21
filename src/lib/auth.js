import users from "@/data/users.json";
import { ROLES, ROUTE_ACCESS } from "@/constants/roles";
import { STORAGE_KEYS } from "@/constants/storage";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

export const getCurrentUser = () => readStorage(STORAGE_KEYS.USER);

export function saveUser(user) {
  writeStorage(STORAGE_KEYS.USER, user);
}

export function login(email, password) {
  const account = users.find(
    (item) => item.email === email && String(item.password) === String(password)
  );

  if (!account) return null;

  const { password: _password, ...user } = account;
  saveUser(user);
  return user;
}

export function logout() {
  removeStorage(STORAGE_KEYS.USER, STORAGE_KEYS.LAST_LOGIN);
}

export function getHomePath(user) {
  return user?.role === ROLES.ADMIN ? "/role" : "/dashboard/summary";
}

export function getRedirectPath(user, pathname) {
  if (!user) return "/login";

  const restricted = Object.entries(ROUTE_ACCESS).find(([path]) =>
    pathname.startsWith(path)
  );

  if (restricted && !restricted[1].includes(user.role)) {
    return getHomePath(user);
  }

  if (user.role === ROLES.ADMIN && pathname.startsWith("/dashboard/summary")) {
    return getHomePath(user);
  }

  return null;
}
