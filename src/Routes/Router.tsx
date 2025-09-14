import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home';
import MyAppBar from "../Components/MyAppBar";
import About from "./About";


const router = createBrowserRouter([
    { path: '/', Component: Home },
    { path: '/about', Component: About }
    // { path: '/products', element: <Products /> },
]);

export default function AppRouter() {
    return (
        <div>

        <MyAppBar router={router}></MyAppBar>
        <RouterProvider router={router} />
        </div>
    );
}