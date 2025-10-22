import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import authStore from "./store/authStore.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={authStore}>
      <App />
    </Provider>
  </StrictMode>
);
