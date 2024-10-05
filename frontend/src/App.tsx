import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useAuthTokenStore } from "./store/useUserStore";
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
import { isTokenExpired } from "./utils/auth";
import { useLogout } from "./hooks/useLogout";
import { useFetchUser } from "./hooks/useUserApi";
import GenerateCustomization from "./pages/GenerateCustomization";
import { useModalStore, ModalKey } from "./store/useStore";
import SurveyModal from "./components/common/modal/modals/SurveyModal";
import TermAandService from "./pages/Term&Service";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { authToken, setAuthToken } = useAuthTokenStore((state) => ({
    authToken: state.authToken,
    setAuthToken: state.setAuthToken,
  }));

  const { refetch: fetchUser, data: user } = useFetchUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setAuthToken(token);
      localStorage.setItem("JWT", token);
      window.history.replaceState({}, document.title, "/");
      fetchUser();
      navigate("/");
    }
  }, [setAuthToken, fetchUser, navigate]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (authToken && isTokenExpired(authToken)) {
        logout();
      }
    };
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 1800000);
    return () => clearInterval(intervalId);
  }, [authToken, logout]);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user && user.isSurveyCompleted === false) {
      openModal(ModalKey.SURVEY_MODAL);
    }
  }, [user, openModal]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-and-service" element={<TermAandService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/model/generate"
          element={<ProtectedRoute element={<Generate3DModel />} />}
        />
        <Route
          path="/model/generate/customization"
          element={<ProtectedRoute element={<GenerateCustomization />} />}
        />
        <Route
          path="/myPage"
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route path="/market" element={<Market />} />
      </Routes>
      <SurveyModal />
    </>
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
