import React, { useContext } from 'react';
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
import { Link } from 'react-router-dom';
import { likeUnlike } from '../../queries/likeQueries/likeQueries';
import { FilterContext } from '../../context/filter';
function TweetCard({ tweet: { username, content, num_of_likes, num_of_comments, tweet_id } }) {
    const { generalTweets, setGeneralTweets, yourTweets, setYourTweets, route } = useContext(FilterContext);
    function like_unlike() {
        console.log('hello world');
        if (route === 'general') {
            likeUnlike(parseInt(tweet_id), generalTweets, setGeneralTweets);
        } else {
            likeUnlike(parseInt(tweet_id), yourTweets, setYourTweets);
        }
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
                        <IconButton onClick={() => { like_unlike() }}>
                            <FavoriteIcon />
                        </IconButton>
                        {num_of_likes}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Link to={`/tweetPage/${tweet_id}`}>
                            <IconButton >
                                <InsertCommentIcon />
                            </IconButton>
                        </Link>
                        {num_of_comments}
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default TweetCard;