import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { CommentsContext } from '../../context/comments';
import { editComment } from '../../queries/commentQuery/commentPostQueries';
function CommentEditForm({ comment: { content, setEditing, index, comment_id } }) {
    const { handleSubmit, watch, register } = useForm();
    const { comments, setComments } = useContext(CommentsContext);
    const contentErrors = watch('content');
    function onSubmit(data) {
        const content = data.content;
        editComment(index, comment_id, content, setComments, comments);
        setEditing(false);
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    style={{ width: '100%' }}
                    InputProps={{ style: { fontSize: 'calc(2.5vw + 5px)' } }}
                    name="content"
                    type="text"
                    multiline
                    placeholder="Add a public comment..."
                    autoComplete="off"
                    defaultValue={content}
                    inputRef={register} />



                <div style={{ float: 'right' }}>
                    <Button onClick={() => { setEditing(false) }}
                        style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                        CANCEL
                     </Button>
                    <Button
                        disabled={!(ValidateEmptiness(contentErrors) && ValidateUnneceserrySpaceUsage(String(contentErrors)))}
                        type='submit'
                        variant="contained"
                        color="primary"
                        style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                        COMMENT
                    </Button>
                </div>
            </form>
        </div >
    )
}


export default CommentEditForm;