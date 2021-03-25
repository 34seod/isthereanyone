import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';
import New from './pages/New/New';
import Room from './pages/Room/Room';

type MatchParams = {
  roomId: string;
};

const App = () => (
  <Router>
    <Switch>
      <Route path="/:roomId" render={( { match }: RouteComponentProps<MatchParams>) => (<Room roomId={match.params.roomId} /> )} />
      <Route path="/" component={New} />
    </Switch>
  </Router>
);

export default App;
