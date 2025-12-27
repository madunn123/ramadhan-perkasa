import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import Route from "./router/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Route />
  </StrictMode>
);
