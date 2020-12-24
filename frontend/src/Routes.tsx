import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import pages
import Home from "./pages/main/Home";
import Category1 from "./pages/Category1";
import Category2 from "./pages/Category2";
import Category3 from "./pages/Category3";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Detail from "./pages/products/Detail";

//import cms pages
import CmsLayout from "./components/cms/Layout";
import CmsHome from "./pages/cms/Home";
import AddProduct from "./pages/cms/products/AddProducts";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/1" component={Category1} />
        <Route exact path="/2" component={Category2} />
        <Route exact path="/3" component={Category3} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/1/:id" component={Detail} />
        <CmsLayout>
          <Route exact path="/cms" component={CmsHome} />
          <Route exact path="/cms/addproduct" component={AddProduct} />
        </CmsLayout>
      </Switch>
    </Router>
  );
};

export default Routes;
