import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const { jwtToken } = useUserStore((state) => ({
    jwtToken: state.jwtToken,
  }));

  return jwtToken ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
