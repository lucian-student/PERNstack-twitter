import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button
} from '@material-ui/core';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { createComment } from '../../queries/commentQuery/commentPostQueries';
import { AuthContext } from '../../context/auth';
import { CommentsContext } from '../../context/comments';
function CommentsForm() {
    const { currentUser: { name } } = useContext(AuthContext);
    const { comments, setComments, tweet } = useContext(CommentsContext);
    const { handleSubmit, watch, register, setValue } = useForm();
    const contentErrors = watch('content');
    function onSubmit(data) {
        setValue("content", "")
        const content = data.content;
        createComment(tweet.tweet_id, name, content, setComments, comments);
    }
    
    // i need make it work
    // watch field and when there is no error display button

    return (
        <div style={{ overflow: 'hidden' }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    style={{ width: '100%' }}
                    name="content"
                    type="text"
                    multiline
                    placeholder="Add a public comment..."
                    autoComplete="off"
                    inputRef={register} />


                {ValidateEmptiness(contentErrors) && ValidateUnneceserrySpaceUsage(String(contentErrors)) && (
                    <div style={{ float: 'right' }}>
                        <Button onClick={() => setValue("content", "")}>
                            CANCEL
                     </Button>
                        <Button type='submit'
                            variant="contained"
                            color="primary">
                            COMMENT
                    </Button>
                    </div>
                )}
            </form>
        </div >
    )
}

export default CommentsForm;