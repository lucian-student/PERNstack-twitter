import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
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
import Paper from '@material-ui/core/Paper';
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import '../../cardCss.css';
function TweetCard({ tweet: { username, content, num_of_likes, num_of_comments, tweet_id, user_id, index } }) {
    const { generalTweets, setGeneralTweets, yourTweets, setYourTweets, route } = useContext(FilterContext);
    const { currentUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    function like_unlike() {
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


    return (
        <Paper elevation={3}
            style={{ overflow: 'hidden' }}>
            <h1 className='cardTitle'>{username}</h1>
            {currentUser.user_id === user_id && !editing && openOptions ? (
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
            ) : (
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <IconButton onClick={() => { setOpenOptions(true) }}
                            data-for='menuOpen'
                            data-tip="Open Menu">
                            <MenuOpenIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                        <ReactTooltip id='menuOpen' place="top" type="dark" effect="solid" />
                    </div>
                )}
            <div>
                {!editing ? (
                    <p style={{ fontSize: 'calc(2vw + 5px)', marginLeft: '10%', marginRight: '10%' }}
                        className='contentField'>

                        {content}
                    </p>
                ) : (
                        <TweetEditForm tweet={{ content, setEditing, index, tweet_id }} />
                    )}
            </div>
            <div style={{ marginLeft: '10%', marginRight: '10%', margintop: '5%', marginBottom: '5%' }}>
                <div style={{ display: 'inline-block' }}>
                    <IconButton onClick={() => { like_unlike() }} >
                        <FavoriteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                    </IconButton >
                    <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }} >
                        {num_of_likes}
                    </div>
                </div>
                <div style={{ float: 'right', display: 'inline-block' }}>
                    <Link to={`/tweetPage/${tweet_id}`}>
                        <IconButton >
                            <InsertCommentIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                    </Link>
                    <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }}>
                        {num_of_comments}
                    </div>
                </div>
            </div>
        </Paper>
    )
}


export default TweetCard;