import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import GeneralTweetsDisplay from '../mainPageComponents/generalTweetsDisplay';
import GeneralTweetSearch from '../mainPageComponents/generalTweetSearch';
import { AuthContext } from '../../context/auth';
function GeneralTweets() {
    const { currentUser } = useContext(AuthContext);
    return (
        <Paper elevation={3}
            className='mainStyle'>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <div className='pageTitle'>
                        <h1>{currentUser.name}</h1>
                    </div>
                    <div>
                        <GeneralTweetSearch />
                        <GeneralTweetsDisplay />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default GeneralTweets;