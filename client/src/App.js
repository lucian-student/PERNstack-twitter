import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/menu';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
function App() {
  return (
    <Fragment>
      <Router>
        <Menu />
        <Switch>
          <Route exact path='/main' component={Main} />
          <Route exact path='/' component={Login} />
          <Route exact path='/Register' component={Register} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
