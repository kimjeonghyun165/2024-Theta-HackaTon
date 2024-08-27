import { useAuthTokenStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { clearAuthToken } = useAuthTokenStore((state) => ({
    clearAuthToken: state.clearAuthToken,
  }));
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate("/");
  };

  return handleLogout;
};
