import React from 'react';
import {
    Paper,
} from '@material-ui/core';
import YourTweetsDisplay from './yourTweetsDisplay';
import YourTweetsSearch from './yourTweetsSearch';

function YourTweets() {
    return (
        <Paper className='mainStyle' elevation={3}>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 'auto', width: '70%' }}>
                    <div>
                        <h1>Your Page</h1>
                    </div>
                    <div>
                        <YourTweetsSearch />
                        <YourTweetsDisplay />
                    </div>
                </div>
            </div>
        </Paper >
    )
}

export default YourTweets;