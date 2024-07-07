import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Generate from "./pages/genrate/generate";
import Edit from "./pages/myPage/edit";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/generate" element={<Generate />} />
        <Route path="/model/nft" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;
