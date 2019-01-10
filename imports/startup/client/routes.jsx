import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from '../../ui/Home/Home';
import Chat from '../../ui/Chat/Chat';
import Social from '../../ui/Social/Social';


const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/chat" component={Chat}/>
      {/* <Route exact path="/app" component={Social}/> */}
    </Switch>
  </Router>
);