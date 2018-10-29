import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from '../../ui/home/Home';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      {/* <Route exact path="/tipity" component={Home}/> */}
    </Switch>
  </Router>
);