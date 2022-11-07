import { getState } from "redux-store/stores";
import { ROLES } from "constants/index";

export const checkRole = (accessRoles, ignoreAdmin) => {
  const state = getState();
  const listRoles = state?.auth?.auth?.authorities || [];
  const isSuperAdmin = listRoles.includes(ROLES["SUPER_ADMIN"]);

  if (
    !accessRoles ||
    accessRoles.length < 1 ||
    (isSuperAdmin && !ignoreAdmin)
  ) {
    return true;
  }
  return (
    accessRoles.map((rA) => listRoles.includes(rA)).filter((b) => !b).length < 1
  );
};

export const checkRoleOr = (accessRoles, ignoreAdmin) => {
  const state = getState();
  const listRoles = state?.auth?.auth?.authorities || [];
  const isSuperAdmin = listRoles.includes(ROLES["SUPER_ADMIN"]);

  if (
    !accessRoles ||
    accessRoles.length < 1 ||
    (isSuperAdmin && !ignoreAdmin)
  ) {
    return true;
  }
  return accessRoles.some((rA) => listRoles.includes(rA));
};
