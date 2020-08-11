import React, { useEffect, useState, useContext } from 'react';
import TweetCard from '../mainPageComponents/tweetCard';
/*import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';*/
import {
    Button
} from '@material-ui/core';
import { FilterContext } from '../../context/filter';
import { generalQuery } from '../../queries/generalTweetsQuery/defaultGeneralQuery';
import { sortByLikes, sortByComments, searchByUsername } from '../../queries/generalTweetsQuery/sortQueries';
import { usernameAndComments, usernameAndLikes } from '../../queries/generalTweetsQuery/sortQueries2';
function GeneralTweetsDisplay() {
    const [tweets, setTweets] = useState(null);
    const { generalQueryValues, setGeneralQueryValues } = useContext(FilterContext);
    useEffect(() => {
        const { query, sortValue, page, username } = generalQueryValues;
        switch (query) {
            case 'general':
                generalQuery(page, setTweets);
                break;
            case 'username_comments':
                if (sortValue != null && username) {
                    usernameAndComments(username, sortValue, page, setTweets);
                }
                break;
            case 'username_likes':
                if (sortValue != null && username) {
                    usernameAndLikes(username, sortValue, page, setTweets);
                }
                break;
            case 'username':
                if (username) {
                    searchByUsername(username, page, setTweets);
                }
                break;
            case 'comments':
                if (sortValue != null) {
                    sortByComments(sortValue, page, setTweets);
                }
                break;
            case 'likes':
                if (sortValue != null) {
                    sortByLikes(sortValue, page, setTweets);
                }
                break;
            default:
                console.log('failed');
        }

    }, [generalQueryValues]);

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
                        {generalQueryValues.page > 0 ? (
                            <Button style={{ width: '50%' }}
                                onClick={() => {
                                    setGeneralQueryValues({
                                        ...generalQueryValues,
                                        page: generalQueryValues.page - 1
                                    });
                                }}>
                                Previous Page {generalQueryValues.page - 1}
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
                                    onClick={() => {
                                        setGeneralQueryValues({
                                            ...generalQueryValues,
                                            page: generalQueryValues.page + 1
                                        });
                                    }}>
                                    Next Page {generalQueryValues.page + 1}
                                </Button>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GeneralTweetsDisplay;