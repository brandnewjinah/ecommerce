import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import main pages
import Home from "./pages/main/Home";

//import main product pages
import Category from "./pages/category";
import Collection from "./pages/collection/Collection";
import AddCollection from "./pages/collection/AddCollection";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Detail from "./pages/products/Detail";
import CollectionDetail from "./pages/collection/Detail";
import AddCollectionProduct from "./pages/collection/AddProduct";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Confirmation from "./pages/order/OrderConfirmation";

//import cms pages
import CmsLayout from "./components/cms/Layout";
import CmsHome from "./pages/cms/Home";
import AddProduct from "./pages/cms/products/AddProducts";
import Products from "./pages/cms/products/ProductList";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={Category} />
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/collection/add" component={AddCollection} />
        <Route exact path="/collection/:id" component={CollectionDetail} />
        <Route exact path="/collection/:id/edit" component={AddCollection} />
        <Route
          exact
          path="/collection/:id/add"
          component={AddCollectionProduct}
        />

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products/:id" component={Detail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmation" component={Confirmation} />

        <CmsLayout>
          <Route exact path="/cms" component={CmsHome} />
          <Route exact path="/cms/products" component={Products} />
          <Route exact path="/cms/products/add" component={AddProduct} />
          <Route exact path="/cms/products/edit/:sku" component={AddProduct} />
        </CmsLayout>
      </Switch>
    </Router>
  );
};

export default Routes;
