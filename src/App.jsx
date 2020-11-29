import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import PostRequest from "./components/pages/PostRequest";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import GuestRoute from "./components/GuestRoute";
import "bulma";
import PostConfirmation from "./components/pages/PostConfirmation";

function App() {
  return (
    <div className="App">
      <Router>
        <SiteHeader />
        <Switch>
          <Route path="/PostRequest">
            <PostRequest />
          </Route>
          <Route path="/PostConfirmation" component={PostConfirmation}></Route>
          <GuestRoute path="/users/login" component={Login} />
          <GuestRoute path="/users/register" component={Register} />
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
