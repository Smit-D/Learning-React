import React from "react";
import "./App.css";

import PageRoutes from "./utility/pageRoutes";
import { Link, Routes } from "react-router-dom";
import Form from "./components/Forms";
function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/form">Form</Link>
          </li>
          <li className="nav-item">
            <Link to="/erp-db-company">ErpDbCompany</Link>
          </li>
        </ul>
      </div>
      <PageRoutes />
    </div>
  );
}

export default App;
