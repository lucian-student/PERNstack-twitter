import React, { useContext } from 'react';
import { CommentsContext } from '../../context/comments';
import CommentCard from './commentCard';
function CommentsDisplay() {
    const { comments } = useContext(CommentsContext);
    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {comments.map(comment => (
                    <li key={comment.comment_id}>
                        <CommentCard comment={comment} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommentsDisplay;