import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {db, auth} from './firebase';


import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Home from "./views/Home.jsx";
import {Auth} from "./views/Auth.jsx";
import store from './store'
import {Provider, useSelector} from "react-redux";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            if (!cookies.get("auth-token")) {
                throw redirect('/login')
            }
            return null
        },
        element: <Home/>,
    },
    {
        path: "/login",
        loader: () => {
            if (cookies.get("auth-token")) {
                throw redirect('/')
            }
            return null
        },
        element: <Auth/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
