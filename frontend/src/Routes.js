import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import Layout from "./layout";
import Blank from "./layout/Blank";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Auth from "./pages/Auth";
import Products from "./pages/category";
import ProductDetail from "./pages/products";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout/index";

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
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/category/:category",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Blank />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default Routes;
