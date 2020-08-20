import React, { useContext, useState } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/auth';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TweetEditForm from '../../components/mainPageComponents/tweetEditForm';
import ReactTooltip from 'react-tooltip';
import { deleteTweet } from '../../queries/tweetsQuery/tweetsQuery';
function TweetDisplay() {
    const { tweet, setTweet } = useContext(CommentsContext);
    const { currentUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    function like_unlike() {
        likeUnlike(0, tweet[0].tweet_id, tweet, setTweet);
    }
    function edit_tweet() {
        setEditing(true);
    }
    function delete_tweet() {
        deleteTweet(tweet[0].tweet_id, setTweet, tweet);
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
            <CardContentCss />
            <CardTitleCss />
            <Card>
                <CardHeader
                    title={tweet[0].username}
                    style={{
                        marginLeft: '10%',
                        display: 'inline-block'
                    }} />
                {currentUser.user_id === tweet[0].user_id && !editing && (
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
                <CardContent style={{ marginLeft: '10%' }}>
                    {!editing ? (
                        <Typography variant="body2" color="textSecondary" component="p"
                            style={{ fontSize: 'calc(2vw + 5px)',marginRight: '10%' }}
                            className='contentField'>
                            {tweet[0].content}
                        </Typography>
                    ) : (
                            <TweetEditForm tweet={{ content: tweet[0].content, setEditing, index: 0, tweet_id: tweet[0].tweet_id }} />
                        )}
                </CardContent>
                <CardActions style={{ marginLeft: '10%', marginRight: '10%' }}>
                    <div>
                        <IconButton onClick={like_unlike}
                            style={{ display: 'inline-block' }}>
                            <FavoriteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                        <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }}>
                            {tweet[0].num_of_likes}
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <InsertCommentIcon style={{ fontSize: 'calc(3vw + 3px)', display: 'inline-block' }} />
                        <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }}>
                            {tweet[0].num_of_comments}
                        </div>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default TweetDisplay;