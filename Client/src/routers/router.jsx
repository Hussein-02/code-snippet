import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
