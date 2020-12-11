import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import GuestRoute from "./components/GuestRoute";
import "bulma";
import PostRequest from "./components/pages/PostRequest";
import PreOrder from "./components/pages/PreOrder";
import ProductsList from "./components/pages/ProductsList";
import Product from "./components/pages/Product";

function App() {
  return (
    <div className="App">
      <Router>
        <SiteHeader />
        <Switch>
          <Route path="/postrequest" component={PostRequest}></Route>
          <Route path="/preorder" component={PreOrder}></Route>
          <GuestRoute path="/users/login" component={Login} />
          <GuestRoute path="/users/register" component={Register} />
          <Route path="/products/:slug" component={Product} />
          <Route path="/" component={ProductsList}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
