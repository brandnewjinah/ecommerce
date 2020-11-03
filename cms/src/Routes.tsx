import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import pages
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
