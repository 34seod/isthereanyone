import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import New from './pages/New';
import Room from './pages/Room';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:roomId" component={Room} />
      <Route exact path="/" component={New} />
    </Switch>
  </Router>
);

export default App;
