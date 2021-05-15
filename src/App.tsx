import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main } from './pages';
import { Header } from './components';
import './App.style.scss';

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route path="/" exact component={Main} />
    </Switch>
  </div>
);
export default App;
