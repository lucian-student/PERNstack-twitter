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
import InsertCommentIcon from '@material-ui/icons/InsertComment'
function TweetDisplay() {
    const { tweet: { num_of_comments, num_of_likes, username, content } } = useContext(CommentsContext);

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
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        {num_of_likes}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <InsertCommentIcon />
                        {num_of_comments}
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default TweetDisplay;