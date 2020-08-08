import React, { useEffect, useState, useContext } from 'react';
import TweetCard from '../mainPageComponents/tweetCard';
/*import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';*/
import {
    Button
} from '@material-ui/core';
import { FilterContext } from '../../context/filter';
import { generalQuery } from '../../queries/generalTweetsQuery/defaultGeneralQuery';

function GeneralTweetsDisplay() {
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(0);
    const { query } = useContext(FilterContext);
    useEffect(() => {
        switch (query) {
            case 'general':
                // code block
                generalQuery(page, setTweets);
                break;
            default:
                console.log('failed');
        }

    }, [page, query]);

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

export default GeneralTweetsDisplay;