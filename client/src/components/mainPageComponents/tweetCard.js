import React from 'react';
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

function TweetCard({ tweet: { username, content, num_of_likes, num_of_comments } }) {
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

                <CardActions style={{ marginLeft: '20%' }}>
                    <div>
                        <IconButton >
                            <FavoriteIcon />
                        </IconButton>
                        {num_of_likes}
                    </div>
                    <div style={{ marginLeft: 'auto', marginRight: '25%' }}>
                        <IconButton>
                            <InsertCommentIcon />
                        </IconButton>
                        {num_of_comments}
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default TweetCard;