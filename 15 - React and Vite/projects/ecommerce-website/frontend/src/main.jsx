import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Import Bootstrap JavaScript (includes Popper.js)

// Step 1: install react-router-dom
// npm i react-router-dom
// Step 2: Import the browser router
import { BrowserRouter } from "react-router-dom";
// Step 3: Encapsulate the App component using the <BrowserRouter> tag

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
