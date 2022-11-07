import React from "react";
import { connect } from "react-redux";
import { checkRoleOr } from "utils/role-utils";

const UnAuth = React.lazy(() => import("pages/unAuth"));

const AuthWrapper = ({ auth, children, accessRoles, isCheckRoute = false }) => {
  // const roles = get(auth, "auth.authorities", []);
  // const isSuperAdmin = roles.includes("ROLE_AdminISofH");

  if (checkRoleOr(accessRoles)) {
    return children;
  }
  if (isCheckRoute) return <UnAuth />;

  return null;
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(AuthWrapper);
