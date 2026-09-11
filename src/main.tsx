import { App } from "@/src/App";
import { showDeveloperSignature } from "@/src/lib/developer-signature";
import React from "react";
import ReactDOM from "react-dom/client";

import "@/src/styles/index.css";

const root = document.querySelector("#root");
if (!root) throw new Error("App root was not found");

showDeveloperSignature();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
