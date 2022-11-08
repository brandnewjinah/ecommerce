import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import Layout from "./layout";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Products from "./pages/category";
import ProductDetail from "./pages/products";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/category/:category",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default Routes;
