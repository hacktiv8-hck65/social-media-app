import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {db, auth} from './firebase';


import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Home from "./views/Home.jsx";
import store from './store'
import {router} from './router'
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router}/>
    </Provider>
);
