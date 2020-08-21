import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { FilterContext } from '../../context/filter';
import TweetCard from '../mainPageComponents/tweetCard';
import { yourDefaultQuery } from '../../queries/yourTweetsQueries/defaultYourQuery';
import { userByComments, userByLikes } from '../../queries/yourTweetsQueries/sortQueries';
import { getHelper, setHelper } from '../../utils/paginationHelper';
function YourTweetsDisplay({ user_id }) {
    const { setYourQueryValues, yourQueryValues, yourTweets, setYourTweets } = useContext(FilterContext);
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
                            {yourTweets.map((tweet, index) => (
                                <li key={tweet.tweet_id}>
                                    <TweetCard tweet={{
                                        ...tweet,
                                        index
                                    }} />
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div>
                        {yourQueryValues.page > 0 ? (
                            <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                                onClick={() => {
                                    setHelper(0);
                                    setYourQueryValues({
                                        ...yourQueryValues,
                                        page: yourQueryValues.page - 1
                                    });
                                }}>
                                Previous
                            </Button>
                        ) : (
                                <Button disabled style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}>
                                    Previous
                                </Button>
                            )}
                        {getHelper() < 10 && yourTweets.length < 10 ? (
                            <Button disabled style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}>
                                Next
                            </Button>
                        ) : (
                                <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                                    onClick={() => {
                                        setHelper(0);
                                        setYourQueryValues({
                                            ...yourQueryValues,
                                            page: yourQueryValues.page + 1
                                        });
                                    }}>
                                    Next
                                </Button>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default YourTweetsDisplay;