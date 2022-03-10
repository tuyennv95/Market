import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default PrivateRoute;
