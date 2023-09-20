import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppStateProvider } from "./context/AppContext";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppStateProvider>
        <RouterProvider router={router} />
      </AppStateProvider>
    </AuthProvider>
  </React.StrictMode>
);
