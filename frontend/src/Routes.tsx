import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import Category1 from "./pages/Category1";
import Category2 from "./pages/Category2";
import Category3 from "./pages/Category3";

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/1" component={Category1} />
          <Route exact path="/2" component={Category2} />
          <Route exact path="/3" component={Category3} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
