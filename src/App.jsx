import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import siteHeader from "./components/siteHeader";
import "bulma";

function App() {
  return (
    <div className="App">
      <Router>
        <siteHeader />
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
