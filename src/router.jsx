import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home.jsx";
import Layout from "./layouts/Layout.jsx";
import Login from "./views/Login.jsx";
import Comment from "./views/Comment.jsx";
import AddPost from "./views/AddPost.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: < Login/>
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-post",
        element: < AddPost/>
      }
    ],
  },
]);