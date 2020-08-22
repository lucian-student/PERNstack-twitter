import React, { useContext, useState } from 'react';
import { CommentsContext } from '../../context/comments';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { likeUnlike } from '../../queries/likeQueries/likeQueries';
import { AuthContext } from '../../context/auth';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TweetEditForm from '../../components/mainPageComponents/tweetEditForm';
import ReactTooltip from 'react-tooltip';
import { deleteTweet } from '../../queries/tweetsQuery/tweetsQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import Paper from '@material-ui/core/Paper';
import '../../cardCss.css';
import { Link } from '@material-ui/core';
function TweetDisplay() {
    const { tweet, setTweet } = useContext(CommentsContext);
    const { currentUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    function like_unlike() {
        likeUnlike(0, tweet[0].tweet_id, tweet, setTweet);
    }
    function edit_tweet() {
        setEditing(true);
    }
    function delete_tweet() {
        deleteTweet(tweet[0].tweet_id, setTweet, tweet);
    }
    return (
        <Paper elevation={3}
            style={{ overflow: 'hidden' }}>
            <Link className='linkUserPage' to={`userPage/${tweet[0].tweet_id}`}>
                <h1 className='cardTitle'>{tweet[0].username}</h1>
            </Link>
            {currentUser.user_id === tweet[0].user_id && !editing && openOptions && (
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <IconButton onClick={delete_tweet}
                        data-for='deleteButton'
                        data-tip="Delete">
                        <DeleteIcon className='selectProp' />
                    </IconButton>
                    <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                    <IconButton onClick={() => {
                        ReactTooltip.hide()
                        edit_tweet()
                    }}
                        data-for='editButton'
                        data-tip="Edit">
                        <EditIcon className='selectProp' />
                    </IconButton>
                    <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                </div>
            )}
            <div style={{ display: 'inline-block', float: 'right' }}>
                {!openOptions && (
                    <div>
                        <IconButton onClick={() => { setOpenOptions(true) }}
                            data-for='menuOpen'
                            data-tip="Open Menu">
                            <MenuOpenIcon className='selectProp' />
                        </IconButton>
                        <ReactTooltip id='menuOpen' place="top" type="dark" effect="solid" />
                    </div>
                )}
            </div>
            <div>
                {!editing ? (
                    <p style={{ marginLeft: '10%', marginRight: '10%' }}
                        className='contentField'>

                        {tweet[0].content}
                    </p>
                ) : (
                        <TweetEditForm tweet={{ content: tweet[0].content, setEditing, index: 0, tweet_id: tweet[0].tweet_id }} />
                    )}
            </div>
            <div style={{ marginLeft: '10%', marginRight: '10%', margintop: '5%', marginBottom: '5%' }}>
                <div style={{ display: 'inline-block' }}>
                    <IconButton onClick={() => { like_unlike() }} >
                        <FavoriteIcon className='selectProp' />
                    </IconButton >
                    <div style={{ display: 'inline-block' }}
                        className='selectProp'>
                        {tweet[0].num_of_likes}
                    </div>
                </div>
                <div style={{ float: 'right', display: 'inline-block', className: 'clearfix' }}>
                    <IconButton disabled>
                        <InsertCommentIcon className='selectProp' />
                    </IconButton>
                    <div style={{ display: 'inline-block' }}
                        className='selectProp'>
                        {tweet[0].num_of_comments}
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default TweetDisplay;

/*
 <Paper elevation={3}
            style={{ overflow: 'hidden' }}>
            <h1 className='cardTitle'>{username}</h1>
            {currentUser.user_id === user_id && !editing && openOptions && (
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <IconButton onClick={delete_tweet}
                        data-for='deleteButton'
                        data-tip="Delete">
                        <DeleteIcon className='selectProp' />
                    </IconButton>
                    <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                    <IconButton onClick={() => {
                        ReactTooltip.hide()
                        edit_tweet()
                    }}
                        data-for='editButton'
                        data-tip="Edit">
                        <EditIcon className='selectProp' />
                    </IconButton>
                    <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                </div>
            )}
            <div style={{ display: 'inline-block', float: 'right' }}>
                {!openOptions && (
                    <div>
                        <IconButton onClick={() => { setOpenOptions(true) }}
                            data-for='menuOpen'
                            data-tip="Open Menu">
                            <MenuOpenIcon className='selectProp' />
                        </IconButton>
                        <ReactTooltip id='menuOpen' place="top" type="dark" effect="solid" />
                    </div>
                )}
            </div>
            <div>
                {!editing ? (
                    <p style={{ marginLeft: '10%', marginRight: '10%' }}
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
                        <FavoriteIcon className='selectProp' />
                    </IconButton >
                    <div style={{ display: 'inline-block' }}
                        className='selectProp'>
                        {num_of_likes}
                    </div>
                </div>
                <div style={{ float: 'right', display: 'inline-block' }}>
                    <Link to={`/tweetPage/${tweet_id}`}>
                        <IconButton >
                            <InsertCommentIcon className='selectProp' />
                        </IconButton>
                    </Link>
                    <div style={{ display: 'inline-block' }}
                        className='selectProp'>
                        {num_of_comments}
                    </div>
                </div>
            </div>
        </Paper>*/