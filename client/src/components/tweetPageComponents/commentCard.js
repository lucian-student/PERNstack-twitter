import React, { Fragment, useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactTooltip from 'react-tooltip';
import { AuthContext } from '../../context/auth';
import { CommentsContext } from '../../context/comments';
import { likeUnlikeComment } from '../../queries/likeQueries/likeQueries';
import { deleteComment } from '../../queries/commentQuery/commentPostQueries';
import CommentEditCard from './commentEditForm';
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import '../../cardCss.css';
function CommentCard({ comment: { tweet_id, username, num_of_likes, content, comment_id, user_id, index } }) {
    const { currentUser } = useContext(AuthContext);
    const { setComments, comments, tweet, setTweet } = useContext(CommentsContext);
    const [openOptions, setOpenOptions] = useState(false);
    const [editing, setEditing] = useState(false);
    function edit_comment() {
        setEditing(true);
    }
    function delete_comment() {
        deleteComment(tweet_id, comment_id, setComments, comments, tweet, setTweet)
    }
    function like_unlike() {
        likeUnlikeComment(index, comment_id, comments, setComments);
    }
    return (
        <Fragment>
            <div style={{ borderBottom: ' 2px solid' }}>
                <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ display: 'inline-block', fontSize: 'calc(2.5vw + 5px)' }}>
                        {username}
                    </h3>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        {currentUser.user_id === user_id && !editing && openOptions && (
                            <div>
                                <IconButton onClick={delete_comment}
                                    data-for='deleteButton'
                                    data-tip="Delete">
                                    <DeleteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                                </IconButton>
                                <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                                <IconButton onClick={edit_comment}
                                    data-for='editButton'
                                    data-tip="Edit">
                                    <EditIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                                </IconButton>
                                <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        {!openOptions && (
                            <div>
                                <IconButton onClick={() => { setOpenOptions(true) }}
                                    data-for='menuOpen'
                                    data-tip="Open Menu">
                                    <MenuOpenIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                                </IconButton>
                                <ReactTooltip id='menuOpen' place="top" type="dark" effect="solid" />
                            </div>
                        )}
                    </div>
                </div>
                {!editing ? (
                    <div>
                        <p style={{ fontSize: 'calc(2.5vw + 5px)' }}
                            className='contentField'>
                            {content}
                        </p>
                        <IconButton onClick={like_unlike}
                            style={{ display: 'inline-block' }}>
                            <FavoriteIcon style={{ fontSize: 'calc(3vw + 3px)' }} />
                        </IconButton>
                        <div style={{ fontSize: 'calc(3vw)', display: 'inline-block' }} >
                            {num_of_likes}
                        </div>
                    </div>
                ) : (
                        <CommentEditCard comment={{
                            content,
                            setEditing,
                            index,
                            comment_id
                        }} />
                    )}
            </div>
        </Fragment>
    )
}

export default CommentCard;
