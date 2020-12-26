import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import pages
import MainLayout from "./components/main/Layout";
import Home from "./pages/main/Home";
import Category1 from "./pages/products/Products";
import Collection from "./pages/collection/Collection";
import AddCollection from "./pages/collection/AddCollection";
import Category2 from "./pages/Category2";
import Category3 from "./pages/Category3";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Detail from "./pages/products/Detail";
import CollectionDetail from "./pages/collection/Detail";
import AddCollectionProduct from "./pages/collection/AddProduct";

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
        <Route exact path="/products" component={Category1} />
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/collection/add" component={AddCollection} />
        <Route exact path="/collection/:id" component={CollectionDetail} />
        <Route exact path="/collection/:id/edit" component={AddCollection} />
        <Route
          exact
          path="/collection/:id/add"
          component={AddCollectionProduct}
        />
        <Route exact path="/2" component={Category2} />
        <Route exact path="/3" component={Category3} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products/:id" component={Detail} />

        <CmsLayout>
          <Route exact path="/cms" component={CmsHome} />
          <Route exact path="/cms/addproduct" component={AddProduct} />
          <Route exact path="/cms/products" component={Products} />
        </CmsLayout>
      </Switch>
    </Router>
  );
};

export default Routes;
