import React, { Fragment, useEffect, useContext } from 'react';
import { commentsQuery, sortByLikes } from '../queries/commentQuery/commentQueries';
import { CommentsContext } from '../context/comments';
import CommentsForm from '../components/tweetPageComponents/commentsForm';
import CommentsDisplay from '../components/tweetPageComponents/commentsDisplay';
import CommentsFilter from '../components/tweetPageComponents/commentsFilter';
import TweetDisplay from '../components/tweetPageComponents/tweetDisplay';

import {
    Paper
} from '@material-ui/core';
function TweetPage(props) {
    const tweetId = props.match.params.tweetId;
    const { tweet, setTweet, setComments, queryValues, setQueryValues } = useContext(CommentsContext);
    useEffect(() => {
        const { query, page, sortValue } = queryValues;
        switch (query) {
            case 'general':
                commentsQuery(tweetId, page, setTweet, setComments);
                break;
            case 'likes':
                if (sortValue !== null) {
                    sortByLikes(sortValue, tweetId, page, setTweet, setComments);
                }
                break;
            default:
                console.log('failed');
        }
    }, [queryValues, tweetId, setComments, setTweet, setQueryValues]);
    // tweetCard
    // commentFilter
    // commentsForm 
    // comments
    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    <Paper elevation={3}
                        className='mainStyle'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ margin: 'auto', width: '70%' }}>
                                <div>
                                    {tweet && (
                                        <div style={{ marginTop: '10%' }}>
                                            <TweetDisplay />
                                            <CommentsFilter />
                                            <CommentsForm />
                                            <CommentsDisplay />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </Fragment>
    )
}

export default TweetPage;