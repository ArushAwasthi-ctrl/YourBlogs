import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import authStore from "./store/authStore.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={authStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
