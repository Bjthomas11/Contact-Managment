import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/home/home.component";
import About from "./components/pages/about/about.component";
import NavBar from "./components/layout/navigation/nav.component";
import Register from "./components/auth/register/register.component";
import Login from "./components/auth/login/login.component";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";

import "./App.css";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment className="App">
            <NavBar title="Contact Keeper" icon="fas fa-id-card-alt" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
