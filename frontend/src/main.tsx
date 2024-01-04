import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify/:id",
    element: <VerifyEmail />,
  },
  {
    path: "/dashboard/:userid",
    element: <Dashboard />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
