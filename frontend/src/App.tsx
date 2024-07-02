import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Create from "./pages/model/create/create";

// import Preview from "./pages/model/preview";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
