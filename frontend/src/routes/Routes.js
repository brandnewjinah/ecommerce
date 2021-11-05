import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routing } from "./Path";

//import home
import Redirect from "../pages/redirect/Redirect";

//import customer pages
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Collection from "../pages/collection/Collection";
import AddCollection from "../pages/collection/AddCollection";
import Detail from "../pages/ProductDetail";
import CollectionDetail from "../pages/collection/Detail";
import AddCollectionProduct from "../pages/collection/AddProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Confirmation from "../pages/order/OrderConfirmation";
import ProductList from "../pages/ProductList";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routing.Home.path} component={Redirect} />
        <Layout>
          <Route exact path={Routing.CustomerHome.path} component={Home} />
          {/* <Route exact path={Routing.Category.path} component={Category} /> */}
          <Route exact path={Routing.Category.path} component={ProductList} />
          <Route exact path={Routing.Wishlist.path} component={Wishlist} />
          <Route exact path={Routing.Detail.path} component={Detail} />
          <Route exact path={Routing.Collection.path} component={Collection} />
          <Route
            exact
            path={Routing.AddCollection.path}
            component={AddCollection}
          />
          <Route
            exact
            path={Routing.CollectionDetail.path}
            component={CollectionDetail}
          />
          <Route
            exact
            path={Routing.EditCollection.path}
            component={AddCollection}
          />
          <Route
            exact
            path={Routing.AddCollectionProduct.path}
            component={AddCollectionProduct}
          />
          <Route exact path={Routing.Cart.path} component={Cart} />
          <Route exact path={Routing.Checkout.path} component={Checkout} />
          <Route
            exact
            path={Routing.Confirmation.path}
            component={Confirmation}
          />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
