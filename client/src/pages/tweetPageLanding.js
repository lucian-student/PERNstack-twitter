import React, { Fragment, useContext, useEffect } from 'react';
import { CommentsContext } from '../context/comments';
import TweetPage from './tweetPage';
function TweetPageLanding(props) {
    const { setQueryValues, queryValues } = useContext(CommentsContext);
    const tweetId = props.match.params.tweetId;
    useEffect(() => {
        setQueryValues({
            query: 'general',
            page: 0,
            sortValue: null
        });
    }, [setQueryValues]);
    return (
        <Fragment>
            {queryValues && tweetId && (
                <TweetPage tweetId={tweetId} />
            )}
        </Fragment>
    )
}

export default TweetPageLanding;