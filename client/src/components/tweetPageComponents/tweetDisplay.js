import React, { useContext } from 'react';
import { CommentsContext } from '../../context/comments';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    IconButton
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { likeUnlike } from '../../queries/likeQueries/likeQueries';
function TweetDisplay() {
    const { tweet, comments, setTweet } = useContext(CommentsContext);
    const { num_of_likes, username, content, tweet_id } = tweet[0];
    function like_unlike() {
        likeUnlike(tweet_id, tweet, setTweet);
    }
    return (
        <div>
            <Card>
                <CardHeader
                    title={username}
                    style={{ marginLeft: '10%' }} />
                <CardContent style={{ marginLeft: '10%' }}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions style={{ marginLeft: '20%', marginRight: '20%' }}>
                    <div>
                        <IconButton onClick={like_unlike}>
                            <FavoriteIcon />
                        </IconButton>
                        {num_of_likes}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <InsertCommentIcon />
                        {comments.length}
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default TweetDisplay;