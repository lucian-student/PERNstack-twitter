import React, { useContext } from 'react';
import { CommentsContext } from '../../context/comments';
import CommentCard from './commentCard';
import {
    Button
} from '@material-ui/core';
import { setHelper, getHelper } from '../../utils/paginationHelper';
function CommentsDisplay() {
    const { comments, queryValues, setQueryValues } = useContext(CommentsContext);
    function checkPrevious() {
        return Boolean(queryValues.page === 0);
    }
    function checkNext() {
        return Boolean(comments.length < 10 || getHelper() < 10);
    }
    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {comments.map((comment, index) => (
                    <li key={comment.comment_id}>
                        <CommentCard comment={{ ...comment, index }} />
                    </li>
                ))}
            </ul>
            <div>
                {comments && (
                    <div>
                        <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setHelper(0);
                                setQueryValues({
                                    ...queryValues,
                                    page: queryValues.page - 1
                                })
                            }}
                            disabled={checkPrevious()}>Previous</Button>
                        <Button style={{ width: '50%', fontSize: 'calc(1.5vw + 5px)' }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setHelper(0);
                                setQueryValues({
                                    ...queryValues,
                                    page: queryValues.page + 1
                                })
                            }}
                            disabled={checkNext()}>Next</Button>
                    </div>
                )
                }
            </div >
        </div >
    )
}

export default CommentsDisplay;