import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/home/home.component";
import About from "./components/pages/about/about.component";
import NavBar from "./components/layout/navigation/nav.component";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <NavBar title="Contact Keeper" icon="fas fa-id-card-alt" />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
