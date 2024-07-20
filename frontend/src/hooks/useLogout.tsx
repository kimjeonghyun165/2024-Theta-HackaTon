import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser, setJwtToken } = useUserStore();

  const logout = () => {
    localStorage.removeItem("token");
    setJwtToken(null);
    setUser(null);
    navigate("/");
  };

  return logout;
};
