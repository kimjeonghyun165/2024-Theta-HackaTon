// src/components/common/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { jwtToken } = useUserStore((state) => ({
    jwtToken: state.jwtToken,
  }));

  return jwtToken ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
