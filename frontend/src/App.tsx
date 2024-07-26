import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Generate from "./pages/generate/generate";
import MyPage from "./pages/myPage/myPage";
import { useUserStore } from "./store/useUserStore";
import connectAndSignMessage from "./utils/web3/setWeb3/connectAndSignMessage";
import { isTokenExpired } from "./utils/auth";
import { useLogout } from "./hooks/useLogout";
import { ProtectedRoute } from "./components/common";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastProvider } from "./components/common/Toast/ToastContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const logout = useLogout();
  const { jwtToken, setUser, fetchUser, setJwtToken } = useUserStore(
    (state) => ({
      jwtToken: state.jwtToken,
      setUser: state.setUser,
      fetchUser: state.fetchUser,
      setJwtToken: state.setJwtToken,
    })
  );

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (jwtToken) {
        if (isTokenExpired(jwtToken)) {
          logout();
        }
      }
    };
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 600000);
    return () => clearInterval(intervalId);
  }, [jwtToken, logout]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          try {
            await connectAndSignMessage();
          } catch (error: any) {
            setUser(null);
          }
        } else {
          logout();
        }
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, [fetchUser, setJwtToken, setUser, jwtToken, logout]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/model/generate"
        element={<ProtectedRoute element={<Generate />} />}
      />
      <Route path="/myPage" element={<ProtectedRoute element={<MyPage />} />} />
    </Routes>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </Router>
);

export default AppWrapper;
