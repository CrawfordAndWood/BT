import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Component List
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/landing/Landing";
import NotFound from "./components/plumbing/layout/NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
