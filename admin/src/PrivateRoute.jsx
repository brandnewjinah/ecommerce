import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const admin = useSelector((state) => state.auth.currentUser);
  const isAdmin = admin && admin.isAdmin;

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
