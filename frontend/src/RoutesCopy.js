import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const RoutesR = () => {
  return (
    <Router>
      <Routes>
        <Layout>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/category/:category" element={<Products />} />
          <Route path="/category/:category/:sub" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/confirmation/:orderId"
            element={<OrderConfirmation />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
        </Layout>
      </Routes>
    </Router>
  );
};

export default RoutesR;
