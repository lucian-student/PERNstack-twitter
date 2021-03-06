import React, { Fragment, useEffect, useContext } from 'react';
import { commentsQuery, sortByLikes } from '../queries/commentQuery/commentQueries';
import { CommentsContext } from '../context/comments';
import CommentsForm from '../components/tweetPageComponents/commentsForm';
import CommentsDisplay from '../components/tweetPageComponents/commentsDisplay';
import CommentsFilter from '../components/tweetPageComponents/commentsFilter';
import TweetDisplay from '../components/tweetPageComponents/tweetDisplay';
import Paper from '@material-ui/core/Paper';
function TweetPage({ tweetId }) {
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
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Paper elevation={3}
                        className='mainStyle'>
                        {tweet && (
                            <div className='firstCenterDiv'>
                                <div className='secondCenterDiv'>
                                    <div style={{ marginTop: '10%' }}>
                                        <TweetDisplay />
                                        <CommentsFilter />
                                        <CommentsForm />
                                        <CommentsDisplay />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Paper>
                </div>
            </div>
        </Fragment>
    )
}

export default TweetPage;