import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import PostRequest from "./components/pages/PostRequest";
import "bulma";

function App() {
  return (
    <div className="App">
      <Router>
        <SiteHeader />
    
        <Switch>
          <Route path='/PostRequest'><PostRequest /></Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
