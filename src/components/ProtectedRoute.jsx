import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";

class ProtectedRoute extends React.Component {
  // isAuthenticated will check if user is logged in or not
  isAuthenticated() {
    const token = this.props.cookies.get("token");
    if (!token) {
      return false;
    }
    return true;
  }

  render() {
    const Comp = this.props.component;

    return this.isAuthenticated() ? <Comp /> : <Redirect to="/" />;
  }
}

export default withCookies(withRouter(ProtectedRoute));
