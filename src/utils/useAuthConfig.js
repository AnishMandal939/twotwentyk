import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import jwt_decode from "jwt-decode";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "redux/slice/shared/userRoleSlice";

export function useAuthConfig() {
  const { isLoading, isAuthenticated } = useAuth0();
  const token = useSelector((state) => state?.appToken?.token);
  const currentRole = useSelector((state) => state?.userRole?.userRole);
  const sessionStorageUserRole = window.sessionStorage.getItem("user_role");
  const dispatch = useDispatch();

  const config = useMemo(() => {
    if (!!token) {
      return {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return null;
  }, [token]);

  const scopes = useMemo(() => {
    if (!!token) {
      const decodeToken = jwt_decode(token);
      const scopeResult = [...decodeToken.scope.split(" ")].filter(
        (x) => x !== "openid" && x !== "profile" && x !== "email"
      );
      return scopeResult;
    }
    return [];
  }, [token]);

  const permissions = useMemo(() => {
    if (!!token) {
      const decodeToken = jwt_decode(token);
      return decodeToken.permissions;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      return undefined !== permissions?.find((x) => x === permission);
    },
    [permissions]
  );

  const authId = useMemo(() => {
    if (!!token) {
      const decodeToken = jwt_decode(token);
      return decodeToken.sub;
    }
    return [];
  }, [token]);

  const hasScope = useCallback(
    (scope) => {
      return undefined !== scopes.find((x) => x === scope);
    },
    [scopes]
  );

  const hasMultiple = useMemo(() => scopes.length > 1, [scopes]);

  const userRoles = useMemo(() => {
    const role = [];
    if (scopes.length > 0) {
      for (const roleList of scopes) {
        switch (roleList) {
          case "CreditControl":
            role.push("Credit Control");
            break;
          default:
            role.push("Customer");
        }
      }
    } else if (token) {
      role.push("Customer");
    }
    if (currentRole == null && role.length >= 1) {
      dispatch(
        setUserRole(!sessionStorageUserRole ? role[0] : sessionStorageUserRole)
      );
    }
    return role;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopes]);

  const isCreditControl = useMemo(() => hasScope("CreditControl"), [hasScope]);

  return {
    config,
    authId,
    isAuthenticated,
    currentRole,
    hasScope,
    hasPermission,
    isCreditControl,
    isLoading,
    hasMultiple,
    userRoles,
    token,
  };
}
