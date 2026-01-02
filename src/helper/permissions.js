import { roles } from "./role";

export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",
  PANEL_VIEW: "panel.view",
};

export const controller = {
  [roles.USER]: [PERMISSIONS.PANEL_VIEW],
  [roles.ADMIN]: [
    PERMISSIONS.PANEL_VIEW,
    PERMISSIONS.DASHBOARD_VIEW,
  ],
};

export function hasPermission(role, permission) {
  return controller[role]?.includes(permission) ?? false;
}
