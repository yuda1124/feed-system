import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main } from './pages';

const App = () => (
  <Switch>
    <Route path="/" exact component={Main} />
  </Switch>
);
export default App;
