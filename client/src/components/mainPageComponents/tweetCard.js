import React, { useContext, useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactTooltip from 'react-tooltip';
import { AuthContext } from '../../context/auth';
import { deleteTweet } from '../../queries/tweetsQuery/tweetsQuery';
import TweetEditForm from './tweetEditForm';
import { withStyles } from '@material-ui/core/styles';
function TweetCard({ tweet: { username, content, num_of_likes, num_of_comments, tweet_id, user_id, index } }) {
    const { generalTweets, setGeneralTweets, yourTweets, setYourTweets, route } = useContext(FilterContext);
    const { currentUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    function like_unlike() {
        console.log('hello world');
        if (route === 'general') {
            likeUnlike(index, parseInt(tweet_id), generalTweets, setGeneralTweets);
        } else {
            likeUnlike(index, parseInt(tweet_id), yourTweets, setYourTweets);
        }
    }
    function edit_tweet() {
        setEditing(true);
    }
    function delete_tweet() {
        if (route === 'general') {
            deleteTweet(tweet_id, setGeneralTweets, generalTweets);
        } else {
            deleteTweet(tweet_id, setYourTweets, yourTweets);
        }
    }

    const CardContentCss = withStyles({
        '@global': {
            '.MuiCardContent-root': {
                padding: 0
            },
        },
    })(() => null);
    const CardTitleCss = withStyles({
        '@global': {
            '.MuiCardHeader-title': {
                fontSize: 'calc(2.5vw + 5px)',
            },
        },
    })(() => null);
    return (
        <div>
            <CardTitleCss />
            <CardContentCss />
            <Card style={{ overflow: 'hidden' }}>
                <CardHeader
                    title={username}
                    style={{
                        marginLeft: '10%',
                        display: 'inline-block',
                    }} />
                {currentUser.user_id === user_id && !editing && (
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <IconButton onClick={delete_tweet}
                            data-for='deleteButton'
                            data-tip="Delete">
                            <DeleteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                        <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                        <IconButton onClick={() => {
                            ReactTooltip.hide()
                            edit_tweet()
                        }}
                            data-for='editButton'
                            data-tip="Edit">
                            <EditIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                        <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                    </div>
                )}
                <CardContent  >
                    {!editing ? (
                        <Typography variant="body2" color="textSecondary" component="p"
                            style={{ fontSize: 'calc(2vw + 5px)', marginLeft: '10%',marginRight: '10%' }}
                            className='contentField'>
                            {content}
                        </Typography>
                    ) : (
                            <TweetEditForm tweet={{ content, setEditing, index, tweet_id }} />
                        )}
                </CardContent>
                <CardActions style={{ marginLeft: '10%', marginRight: '10%' }}>
                    <div>
                        <IconButton onClick={() => { like_unlike() }}
                            style={{ display: 'inline-block' }}>
                            <FavoriteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton >
                        <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }} >
                            {num_of_likes}
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Link to={`/tweetPage/${tweet_id}`}
                            style={{ display: 'inline-block' }}>
                            <IconButton >
                                <InsertCommentIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                            </IconButton>
                        </Link>
                        <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }}>
                            {num_of_comments}
                        </div>
                    </div>
                </CardActions>
            </Card>
        </div >
    )
}

export default TweetCard;