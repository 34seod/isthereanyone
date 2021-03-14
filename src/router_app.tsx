import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import New from './pages/new';
import Room from './pages/room';

export const RouterApp = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={New} />
      <Route path='/:roomId' component={Room} />
    </Switch>
  </Router>
);
