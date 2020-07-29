import React, { Fragment, useEffect, useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Menu from './components/menu';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import { AuthContext } from './context/auth';
import { setAccessToken } from './utils/accessToken';
import { transport } from './axios/cookieAxios';
import NotAuthRoute from './utils/notAuthRoute';
import AuthRoute from './utils/authRoute';
function App() {
  const [loading, setLoading] = useState(true);
  const { loginUser } = useContext(AuthContext);
  useEffect(() => {
    const reciveData = async () => {
      await transport
        .post('http://localhost:5000/token/refresh_token', {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
          setAccessToken(res.data.accessToken);
          loginUser();
          setLoading(false);
        })
        .catch(err => {
          console.error(err.message);
          setLoading(false);
        });
    };
    reciveData();

  }, [loginUser]);
  if (loading) {
    return <div>Loading ...</div>
  }
  return (
    <Fragment>
      <Router>
        <Menu />
        <Switch>
          <AuthRoute exact path='/main' component={Main} />
          <NotAuthRoute exact path='/' component={Login} />
          <NotAuthRoute exact path='/Register' component={Register} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
