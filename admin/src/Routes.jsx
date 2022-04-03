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

//products
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";

import OrderList from "./pages/orders/OrderList";
import OrderDetail from "./pages/orders/OrderDetail";
import CustomerList from "./pages/customers/CustomerList";
import UserDetail from "./pages/customers/UserDetail";
import SubscribersList from "./pages/SubscribersList";

const Routes = () => {
  const admin = useSelector((state) => state.auth.currentUser);
  const isAdmin = admin && admin.isAdmin;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/products" component={ProductList} />
          <PrivateRoute exact path="/addproduct" component={AddProduct} />
          <PrivateRoute exact path="/products/:id" component={ProductDetail} />
          <PrivateRoute
            exact
            path="/products/edit/:id"
            component={EditProduct}
          />
          <PrivateRoute exact path="/orders" component={OrderList} />
          <PrivateRoute exact path="/orders/:id" component={OrderDetail} />
          <PrivateRoute exact path="/customers" component={CustomerList} />
          <PrivateRoute exact path="/users/:id" component={UserDetail} />
          <PrivateRoute exact path="/subscribers" component={SubscribersList} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
