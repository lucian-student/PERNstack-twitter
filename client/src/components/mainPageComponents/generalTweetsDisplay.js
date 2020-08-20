import React, { useEffect, useContext } from 'react';
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
import { setHelper, getHelper } from '../../utils/paginationHelper';
function GeneralTweetsDisplay() {
    const { generalQueryValues, setGeneralQueryValues, generalTweets, setGeneralTweets } = useContext(FilterContext);
    useEffect(() => {
        const { query, sortValue, page, username } = generalQueryValues;
        switch (query) {
            case 'general':
                generalQuery(page, setGeneralTweets);
                break;
            case 'username_comments':
                if (sortValue != null && username) {
                    usernameAndComments(username, sortValue, page, setGeneralTweets);
                }
                break;
            case 'username_likes':
                if (sortValue != null && username) {
                    usernameAndLikes(username, sortValue, page, setGeneralTweets);
                }
                break;
            case 'username':
                if (username) {
                    searchByUsername(username, page, setGeneralTweets);
                }
                break;
            case 'comments':
                if (sortValue != null) {
                    sortByComments(sortValue, page, setGeneralTweets);
                }
                break;
            case 'likes':
                if (sortValue != null) {
                    sortByLikes(sortValue, page, setGeneralTweets);
                }
                break;
            default:
                console.log('failed');
        }

    }, [generalQueryValues, setGeneralTweets]);

    return (
        <div>
            {generalTweets && (
                <div>
                    <div >
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {generalTweets.map((tweet, index) => (
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
                        {generalQueryValues.page > 0 ? (
                            <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                                onClick={() => {
                                    setHelper(0);
                                    setGeneralQueryValues({
                                        ...generalQueryValues,
                                        page: generalQueryValues.page - 1
                                    });
                                }}>
                                Previous
                            </Button>
                        ) : (
                                <Button disabled style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}>
                                    Previous
                                </Button>
                            )}
                        {getHelper() < 10 && generalTweets.length < 10 ? (
                            <Button disabled style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}>
                                Next
                            </Button>
                        ) : (
                                <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                                    onClick={() => {
                                        setHelper(0);
                                        setGeneralQueryValues({
                                            ...generalQueryValues,
                                            page: generalQueryValues.page + 1
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

export default GeneralTweetsDisplay;