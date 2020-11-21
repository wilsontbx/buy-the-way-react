import React from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar'

import 'bulma'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
