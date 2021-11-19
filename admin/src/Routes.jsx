import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//products
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";

import OrderList from "./pages/orders/OrderList";
import CustomerList from "./pages/customers/CustomerList";
import UserDetail from "./pages/customers/UserDetail";

import Announcement from "./pages/Announcements";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route exact path="/products/edit/:id" component={EditProduct} />
          <Route exact path="/orders" component={OrderList} />
          <Route exact path="/customers" component={CustomerList} />
          <Route exact path="/users/:id" component={UserDetail} />
          <Route exact path="/announcement" component={Announcement} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
