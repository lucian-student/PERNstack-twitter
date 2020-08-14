import React from 'react';
import {
    IconButton,
    MenuItem,
    Menu
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
function CommentCard({ comment: { tweet_id, username, num_of_likes, content, comment_id, user_id } }) {
    return (
        <div style={{ borderBottom: ' 2px solid' }}>
            <div style={{ overflow: 'hidden' }}>
                <h3 style={{ display: 'inline-block' }}>
                    {username}
                </h3>
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment >
                                <IconButton {...bindTrigger(popupState)}>
                                    <ListIcon />
                                </IconButton>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem onClick={() => {
                                        console.log('Edit tweetId:' + tweet_id);
                                        popupState.close();
                                    }}>Edit</MenuItem>
                                    <MenuItem onClick={() => {
                                        console.log('Delete tweetId:' + tweet_id);
                                        popupState.close();
                                    }}>Delete</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
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
    )
}

export default CommentCard;