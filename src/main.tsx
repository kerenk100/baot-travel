import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { allRoutes } from "./routes/routes.tsx";
import { App } from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: allRoutes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
