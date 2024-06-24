import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/layout";

const Home: React.FC = () => {
  return (
    <div>
      <Layout />
      <h1>서비스 소개 페이지 (About, how to use etc)</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/model/preview">Preview</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
