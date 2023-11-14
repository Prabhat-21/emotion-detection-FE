import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="534042040906-qff5ftkdcklm1sfrs99ct4s794gkcvbv.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
