import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Generate from "./pages/genrate/generate";
import MyPage from "./pages/myPage/myPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/generate" element={<Generate />} />
        <Route path="/model/nft" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
