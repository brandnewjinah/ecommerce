import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ isAdmin: isAdmin, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAdmin) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
