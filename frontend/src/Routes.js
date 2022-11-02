import React from "react";
import { createBrowserRouter } from "react-router-dom";

//pages
import Layout from "./layout";
import ErrorPage from "./pages/error";
import Products from "./pages/products";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

export default Routes;
