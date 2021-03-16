import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import New from './pages/new';
import Room from './pages/room';

const App = () => (
  <Router>
    <Switch>
      <Route path='/:roomId' component={Room} />
      <Route path="/" component={New} />
    </Switch>
  </Router>
);

export default App;
