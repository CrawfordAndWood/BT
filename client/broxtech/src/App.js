import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Bulma

import {
  Heading,
  Button,
  Container,
  Columns,
  Section,
} from "react-bulma-components";
import "react-bulma-components/dist/react-bulma-components.min.css";

//Component List
import Alert from "./components/plumbing/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/landing/Landing";
import NotFound from "./components/plumbing/layout/NotFound";
import Navigation from "./components/plumbing/navbar/Navigation";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Container>
            <div className="App">
              <Navigation />
              <Alert />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
