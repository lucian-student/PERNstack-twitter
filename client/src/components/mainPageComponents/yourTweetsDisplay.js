import React, { useEffect, useContext } from 'react';
import {
    Button
} from '@material-ui/core';
import { FilterContext } from '../../context/filter';
import TweetCard from '../mainPageComponents/tweetCard';
import { yourDefaultQuery } from '../../queries/yourTweetsQueries/defaultYourQuery';
import { AuthContext } from '../../context/auth';
import { userByComments, userByLikes } from '../../queries/yourTweetsQueries/sortQueries';
function YourTweetsDisplay() {
    const { setYourQueryValues, yourQueryValues, yourTweets, setYourTweets } = useContext(FilterContext);
    const { currentUser: { user_id } } = useContext(AuthContext);
    useEffect(() => {
        const { query, page, sortValue } = yourQueryValues;
        switch (query) {
            case 'general':
                yourDefaultQuery(user_id, page, setYourTweets);
                break;
            case 'comments':
                if (sortValue != null) {
                    userByComments(user_id, sortValue, page, setYourTweets);
                }
                break;
            case 'likes':
                if (sortValue != null) {
                    userByLikes(user_id, sortValue, page, setYourTweets);
                }
                break;
            default:
                console.log('failed');
        }
    }, [yourQueryValues, user_id, setYourTweets]);
    return (
        <div>
            {yourTweets && (
                <div>
                    <div >
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {yourTweets.map(tweet => (
                                <li key={tweet.tweet_id}>
                                    <TweetCard tweet={tweet} />
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div>
                        {yourQueryValues.page > 0 ? (
                            <Button style={{ width: '50%' }}
                                onClick={() => {
                                    setYourQueryValues({
                                        ...yourQueryValues,
                                        page: yourQueryValues.page - 1
                                    });
                                }}>
                                Previous Page {yourQueryValues.page - 1}
                            </Button>
                        ) : (
                                <Button disabled style={{ width: '50%' }}>
                                    No Previous Page
                                </Button>
                            )}
                        {yourTweets.length < 10 ? (
                            <Button disabled style={{ width: '50%' }}>
                                No Next Page
                            </Button>
                        ) : (
                                <Button style={{ width: '50%' }}
                                    onClick={() => {
                                        setYourQueryValues({
                                            ...yourQueryValues,
                                            page: yourQueryValues.page + 1
                                        });
                                    }}>
                                    Next Page {yourQueryValues.page + 1}
                                </Button>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default YourTweetsDisplay;