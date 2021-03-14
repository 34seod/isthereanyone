import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import New from './pages/new';
import Room from './pages/room';
import Waiting from './pages/waiting';

export const RouterApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <New />
      </Route>
      <Route path="/about">
        <Waiting />
      </Route>
      <Route path="/dashboard">
        <Room />
      </Route>
    </Switch>
  </Router>
);
