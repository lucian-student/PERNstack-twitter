import React, { Fragment, useEffect, useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Menu from './components/menu';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import TweetPageLanding from './pages/tweetPageLanding';
import { AuthContext } from './context/auth';
import { setAccessToken } from './utils/accessToken';
import { transport } from './axios/cookieAxios';
import NotAuthRoute from './utils/notAuthRoute';
import AuthRoute from './utils/authRoute';
import { FilterProvider } from './context/filter';
import { CommentsProvider } from './context/comments';
import { withStyles } from '@material-ui/core/styles';
import UserPage from './pages/userPage';
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
          loginUser().then(() => {
            setLoading(false);
          });
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

  const CardContentCss = withStyles({
    '@global': {
      '.MuiCardContent-root': {
        padding: 0
      },
    },
  })(() => null);
  const CardTitleCss = withStyles({
    '@global': {
      '.MuiCardHeader-title': {
        fontSize: 'calc(2.5vw + 5px)',
      },
    },
  })(() => null);
  return (
    <Fragment>
      <CardTitleCss />
      <CardContentCss />
      {!loading && (
        <CommentsProvider>
          <FilterProvider>
            <Router>
              <Menu />
              <Switch>
                <AuthRoute exact path='/main' component={Main} />
                <AuthRoute exact path='/userPage/:userId' component={UserPage} />
                <AuthRoute exact path='/tweetPage/:tweetId' component={TweetPageLanding} />
                <NotAuthRoute exact path='/' component={Login} />
                <NotAuthRoute exact path='/Register' component={Register} />
              </Switch>
            </Router>
          </FilterProvider>
        </CommentsProvider>
      )}
    </Fragment>
  );
}

export default App;



