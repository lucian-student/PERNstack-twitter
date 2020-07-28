import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/menu';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import { AuthProvider } from './context/auth';
import { setAccessToken } from './utils/accessToken';
import { transport } from './axios/cookieAxios';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const reciveData = async () => {
      await transport
        .post('http://localhost:5000/token/refresh_token', {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
          setAccessToken(res.data.accessToken);
          console.log(res.data.accessToken);
          setLoading(false);
        })
        .catch(err => {
          console.error(err.message)
          setLoading(false);
        });
    };
    reciveData();
  }, []);
  if (loading) {
    return <div>Loading ...</div>
  }
  return (
    <Fragment>
      <AuthProvider>
        <Router>
          <Menu />
          <Switch>
            <Route exact path='/main' component={Main} />
            <Route exact path='/' component={Login} />
            <Route exact path='/Register' component={Register} />
          </Switch>
        </Router>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
