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
import ProductDetail from "./pages/products/ProductDetail";

import Orders from "./pages/Orders";
import UserList from "./pages/users/UserList";
import UserDetail from "./pages/users/UserDetail";

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
          <Route exact path="/products/edit/:id" component={AddProduct} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:id" component={UserDetail} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
