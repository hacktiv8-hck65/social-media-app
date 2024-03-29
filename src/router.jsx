import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Home from "./views/Home.jsx";
import Layout from "./layouts/Layout.jsx";
import Login from "./views/Login.jsx";
import Comment from "./views/Comment.jsx";
import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
import AddPost from "./views/AddPost.jsx";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        loader: () => {
            if (!cookies.get("auth-token")) {
                throw redirect('/login')
            }
            return null
        },
        children: [
            {
                path: "/",
                element: <Home/>,
            },
        ],
    },
    {
        path: "/login",
        loader: () => {
            if (cookies.get("auth-token")) {
                throw redirect('/')
            }
            return null
        },
        element: <Login/>,
    },
]);