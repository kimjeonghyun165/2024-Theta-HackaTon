import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthTokenStore } from "../../store/useUserStore";
import { isTokenExpired } from "../../utils/auth";
import { useLogout } from "../../hooks/useLogout";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { authToken } = useAuthTokenStore((state) => ({
    authToken: state.authToken,
  }));
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    if (authToken && isTokenExpired(authToken)) {
      logout();
      navigate("/");
    }
  }, [authToken, navigate, logout]);

  return authToken && !isTokenExpired(authToken) ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
