import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

//import pages
import Home from "./pages/Home";
import Category1 from "./pages/Category1";
import Category2 from "./pages/Category2";
import Category3 from "./pages/Category3";

//import styles and assets
import styled from "styled-components";

const Routes = () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/1" component={Category1} />
          <Route exact path="/2" component={Category2} />
          <Route exact path="/3" component={Category3} />
        </Switch>
      </Wrapper>
      <Footer />
    </Router>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default Routes;
