import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/model/create";
import Preview from "./pages/model/preview";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <div></div>
        <Route path="/" element={<Home />} />
        <Route path="/model/create" element={<Create />} />
        <Route path="/model/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
};

export default App;
