import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import Layout from "./layout";
import Blank from "./layout/Blank";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Products from "./pages/category";
import ProductDetail from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderConfirmation from "./pages/confirmation";
import Wishlist from "./pages/wishlist";
import UserProfile from "./pages/user/Account";
import OrderHistory from "./pages/user/OrderHistory";
import OrderDetail from "./pages/user/OrderDetail";

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
        path: "/category/:category/:sub",
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
      {
        path: "/confirmation/:orderId",
        element: <OrderConfirmation />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/user",
        element: <UserProfile />,
      },
      {
        path: "/orders",
        element: <OrderHistory />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetail />,
      },
    ],
  },
  {
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
