import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import New from './pages/new';
import Room from './pages/room';

type MatchParams = {
  roomId: string;
};

const App = () => (
  <Router>
    <Switch>
      <Route path='/chat/:roomId' component={ChatRoom} />
      <Route path="/:roomId" render={( { match }: RouteComponentProps<MatchParams>) => (<Room roomId={match.params.roomId} /> )} />
      <Route path="/" component={New} />
    </Switch>
  </Router>
);

export default App;
