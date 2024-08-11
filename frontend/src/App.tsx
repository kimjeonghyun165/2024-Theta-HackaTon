import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastProvider } from "./components/common/ToastContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import Generate3DModel from "./pages/Generate";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Market from "./pages/Market";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user, setJwtToken, fetchUser } = useUserStore((state) => ({
    user: state.user,
    setJwtToken: state.setJwtToken,
    fetchUser: state.fetchUser,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("Extracted token from URL:", token);
    if (token) {
      setJwtToken(token);
      localStorage.setItem("JWT", token);
      window.history.replaceState({}, document.title, "/");
      fetchUser();
      navigate("/"); // React Router의 useNavigate를 사용하여 홈으로 리디렉션
    }
  }, [setJwtToken, fetchUser, navigate]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/model/generate" element={<Generate3DModel />} />
      <Route path="/myPage" element={<ProtectedRoute element={<MyPage />} />} />
      <Route path="/market" element={<Market />} />
    </Routes>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
        <ReactQueryDevtools />
      </ToastProvider>
    </QueryClientProvider>
  </Router>
);

export default AppWrapper;
