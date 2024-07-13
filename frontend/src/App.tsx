import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Generate from "./pages/generate/generate";
import MyPage from "./pages/myPage/myPage";
import { useUserStore } from "./store/useUserStore";
import connectAndSignMessage from "./utils/metamask";
import logout from "./utils/logout";

const App: React.FC = () => {
  const { setUser, fetchUser, setJwtToken } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          try {
            await connectAndSignMessage();
            setError(null);
          } catch (error: any) {
            setError(error.message);
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
  }, [fetchUser, setJwtToken, setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/generate" element={<Generate />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
