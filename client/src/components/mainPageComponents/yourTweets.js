import React from 'react';
import {
    Paper,
} from '@material-ui/core';
import YourTweetsDisplay from './yourTweetsDisplay';
import YourTweetsSearch from './yourTweetsSearch';
import TweetForm from './tweetForm';
function YourTweets() {
    return (
        <Paper className='mainStyle' elevation={3}>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 'auto', width: '70%' }}>
                    <div style={{ fontSize: ' calc(2vw + 10px)' }}>
                        <h1 >Your Page</h1>
                    </div>
                    <div>
                        <YourTweetsSearch />
                        <TweetForm />
                        <YourTweetsDisplay />
                    </div>
                </div>
            </div>
        </Paper >
    )
}

export default YourTweets;