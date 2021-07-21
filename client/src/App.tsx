import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import New from './pages/New';
import Room from './pages/Room';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:roomId" component={Room} />
        <Route exact path="/" component={New} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
