import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";

//products
import ProductList from "./pages/products/ProductList";
import AddProduct from "./pages/products/AddProduct";

import Orders from "./pages/Orders";
import UserList from "./pages/UserList";

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/users" component={UserList} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
