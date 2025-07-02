import React from "react";
import ReactDOM from "react-dom/client";
import TelegramQRApp from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <TelegramQRApp />
    </HashRouter>
  </React.StrictMode>
);
