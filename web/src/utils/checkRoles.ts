import { UserPermissions } from "../types";

export const checkRoles = (
  userRoles: UserPermissions[],
  roles: UserPermissions[]
) => {
  const userRoleSet = new Set(userRoles);

  for (const role of roles) {
    if (!userRoleSet.has(role)) {
      return false;
    }
  }
  return true;
};
