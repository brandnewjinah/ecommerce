import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

//import components
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Test from "./pages/test";

//products
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";

import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import CustomerList from "./pages/customers/CustomerList";
import UserDetail from "./pages/customers/UserDetail";

const Routes = () => {
  const admin = useSelector((state) => state.auth.currentUser);
  const isAdmin = admin && admin.isAdmin;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test} />
        {/* <Route exact path="/signin" component={Login} /> */}
        {/* <Layout> */}
        {/* <PrivateRoute path="/home" component={Home} isAdmin={isAdmin} /> */}
        {/* <Route exact path="/home" component={Home} /> */}
        {/* <Route exact path="/products" component={ProductList} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route exact path="/products/edit/:id" component={EditProduct} />
          <Route exact path="/orders" component={OrderList} />
          <Route exact path="/orders/:id" component={OrderDetail} />
          <Route exact path="/customers" component={CustomerList} />
          <Route exact path="/users/:id" component={UserDetail} />
          */}
        {/* </Layout> */}
      </Switch>
    </Router>
  );
};

export default Routes;
