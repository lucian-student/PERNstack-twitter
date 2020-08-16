import React, { Fragment, useContext, useState } from 'react';
import {
    IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactTooltip from 'react-tooltip';
import { AuthContext } from '../../context/auth';
import { CommentsContext } from '../../context/comments';
import { likeUnlikeComment } from '../../queries/likeQueries/likeQueries';
import { deleteComment } from '../../queries/commentQuery/commentPostQueries';
import CommentEditCard from './commentEditForm';
function CommentCard({ comment: { tweet_id, username, num_of_likes, content, comment_id, user_id, index } }) {
    const { currentUser } = useContext(AuthContext);
    const { setComments, comments, tweet, setTweet } = useContext(CommentsContext);
    const [editing, setEditing] = useState(false);
    function edit_comment() {
        setEditing(true);
    }
    function delete_comment() {
        deleteComment(tweet_id, comment_id, setComments, comments, tweet, setTweet)
    }
    function like_unlike() {
        likeUnlikeComment(comment_id, comments, setComments);
    }
    return (
        <Fragment>
            <div style={{ borderBottom: ' 2px solid' }}>
                <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ display: 'inline-block' }}>
                        {username}
                    </h3>
                    {currentUser.user_id === user_id && !editing && (
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            <IconButton onClick={delete_comment}
                                data-for='deleteButton'
                                data-tip="Delete">
                                <DeleteIcon />
                            </IconButton>
                            <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                            <IconButton onClick={edit_comment}
                                data-for='editButton'
                                data-tip="Edit">
                                <EditIcon />
                            </IconButton>
                            <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                        </div>
                    )}

                </div>
                {!editing ? (
                    <div>
                        <p>
                            {content}
                        </p>
                        <IconButton onClick={like_unlike}>
                            <FavoriteIcon />
                        </IconButton>
                        {num_of_likes}
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
