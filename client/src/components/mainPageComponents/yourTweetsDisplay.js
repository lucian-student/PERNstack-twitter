import React, { useEffect, useState, useContext } from 'react';
import {
    Button
} from '@material-ui/core';
import { FilterContext } from '../../context/filter';
import TweetCard from '../mainPageComponents/tweetCard';
import { yourDefaultQuery } from '../../queries/yourTweetsQueries/defaultYourQuery';
import { AuthContext } from '../../context/auth';
function YourTweetsDisplay() {
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(0);
    const { yourQuery } = useContext(FilterContext);
    const { currentUser: { user_id } } = useContext(AuthContext);
    useEffect(() => {
        switch (yourQuery) {
            case 'general':
                // code block
                yourDefaultQuery(user_id, page, setTweets);
                break;
            default:
                console.log('failed');
        }

    }, [page, yourQuery]);
    return (
        <div>
            {tweets && (
                <div>
                    <div >
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {tweets.map(tweet => (
                                <li key={tweet.tweet_id}>
                                    <TweetCard tweet={tweet} />
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div>
                        {page > 0 ? (
                            <Button style={{ width: '50%' }}
                                onClick={() => { setPage(page - 1) }}>
                                Previous Page {page - 1}
                            </Button>
                        ) : (
                                <Button disabled style={{ width: '50%' }}>
                                    No Previous Page
                                </Button>
                            )}
                        {tweets.length < 10 ? (
                            <Button disabled style={{ width: '50%' }}>
                                No Next Page
                            </Button>
                        ) : (
                                <Button style={{ width: '50%' }}
                                    onClick={() => { setPage(page + 1) }}>
                                    Next Page {page + 1}
                                </Button>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default YourTweetsDisplay;