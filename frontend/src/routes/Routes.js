import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routing } from "./Path";

//import home
import Root from "../pages/Root";

//import customer pages
import Layout from "../layout/main/Layout";
import Home from "../pages/home/Home";
import Auth from "../pages/Auth";
import Wishlist from "../pages/Wishlist";
import Detail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Confirmation from "../pages/OrderConfirmation";
import ProductList from "../pages/ProductList";
import OrderHistory from "../pages/OrderHistory";
import User from "../pages/UserProfile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routing.Home.path} component={Root} />
        <Layout>
          <Route exact path={Routing.CustomerHome.path} component={Home} />
          <Route exact path={Routing.Signin.path} component={Auth} />
          <Route
            exact
            path={Routing.ProductList.path}
            component={ProductList}
          />
          <Route exact path={Routing.Wishlist.path} component={Wishlist} />
          <Route exact path={Routing.ProductDetail.path} component={Detail} />
          <Route exact path={Routing.UserProfile.path} component={User} />
          <Route
            exact
            path={Routing.OrderHistory.path}
            component={OrderHistory}
          />
          <Route exact path={Routing.Cart.path} component={Cart} />
          <Route exact path={Routing.Checkout.path} component={Checkout} />
          <Route
            exact
            path={Routing.Confirmation.path}
            component={Confirmation}
          />
          <Route
            exact
            path={Routing.OrderDetail.path}
            component={Confirmation}
          />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
