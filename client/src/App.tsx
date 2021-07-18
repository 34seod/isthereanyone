import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import New from './pages/New';
import Room from './pages/Room';

const store = createStore(
  reducers, composeWithDevTools(applyMiddleware(thunk))
);

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
