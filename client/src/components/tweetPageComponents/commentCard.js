import React, { Fragment } from 'react';
import {
    IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReactTooltip from 'react-tooltip';
function CommentCard({ comment: { tweet_id, username, num_of_likes, content, comment_id, user_id } }) {

    return (
        <Fragment>
            <div style={{ borderBottom: ' 2px solid' }}>
                <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ display: 'inline-block' }}>
                        {username}
                    </h3>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <IconButton onClick={() => {

                        }}
                        data-for='deleteButton'
                        data-tip="Delete">
                            <DeleteIcon />
                        </IconButton>
                        <ReactTooltip id='deleteButton' place="top" type="dark" effect="solid" />
                        <IconButton onClick={() => {

                        }}
                        data-for='editButton'
                        data-tip="Edit">
                            <EditIcon />
                        </IconButton>
                        <ReactTooltip id='editButton' place="top" type="dark" effect="solid" />
                    </div>
                </div>
                <p>
                    {content}
                </p>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                {num_of_likes}
            </div>
        </Fragment>
    )
}

export default CommentCard;
