import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, Detail } from './pages';
import { Header } from './components';
import './App.style.scss';

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route path="/:id">
        <Detail />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </div>
);
export default App;
