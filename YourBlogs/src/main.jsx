import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import authStore from "./store/authStore.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Addpost from "./pages/Addpost.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
import MyPost from "./pages/Mypost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-post",
        element: <Addpost />,
      },
      {
        path: "/post/:postId",
        element: <Post />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />,
      },
      {
        path: "my-posts",
        element: <MyPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={authStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
