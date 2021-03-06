import React, { Fragment, useContext, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import YourTweetsSearch from '../components/mainPageComponents/yourTweetsSearch';
import TweetForm from '../components/mainPageComponents/tweetForm';
import YourTweetsDisplay from '../components/mainPageComponents/yourTweetsDisplay';
import { AuthContext } from '../context/auth';
import { FilterContext } from '../context/filter';
function UserPage(props) {
    const user_id = parseInt(props.match.params.userId);
    const { currentUser } = useContext(AuthContext);
    const { setRoute, route, setYourTweets } = useContext(FilterContext);
    useEffect(() => {
        setRoute('your');
        return () => {
            setYourTweets(null);
        }
    }, [setRoute, setYourTweets]);

    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Paper className='mainStyle' elevation={3}>
                        <div className='firstCenterDiv'>
                            <div className='secondCenterDiv'>
                                <div className='pageTitle'>
                                    <h1 >User Page</h1>
                                </div>
                                {route === 'your' && (
                                    <div>
                                        <YourTweetsSearch />
                                        {currentUser.user_id === user_id && (
                                            <TweetForm />
                                        )}
                                        <YourTweetsDisplay user_id={user_id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Paper >
                </div>
            </div>
        </Fragment>
    )
}

export default UserPage;