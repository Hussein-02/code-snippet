import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Snippet from "../pages/Snippet/Snippet";
import Update from "../pages/Update/Update";

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
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add",
        element: <Snippet />,
      },
      {
        path: "/update",
        element: <Update />,
      },
    ],
  },
]);

export default router;
