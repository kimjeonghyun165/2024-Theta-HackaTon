import { useUserStore } from "../store/useUserStore";

const logout = () => {
  const { setUser, setJwtToken } = useUserStore.getState();
  localStorage.removeItem("token");
  setJwtToken(null);
  setUser(null);
};

export default logout;
