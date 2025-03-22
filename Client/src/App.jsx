import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* this is substituted by a component in router.jsx */}
      <Outlet />
    </div>
  );
}

export default App;
