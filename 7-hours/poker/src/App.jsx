import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from 'react-router-dom';

import Hall from './pages/Hall';
import Room from './pages/Room';

import './app.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room/:name">
          <Room />
        </Route>
        <Route path="/">
          <Hall />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
