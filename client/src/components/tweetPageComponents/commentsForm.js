import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { createComment } from '../../queries/commentQuery/commentPostQueries';
import { AuthContext } from '../../context/auth';
import { CommentsContext } from '../../context/comments';
function CommentsForm() {
    const { currentUser: { name } } = useContext(AuthContext);
    const [start, setStart] = useState(false);
    const { comments, setComments, tweet, setTweet } = useContext(CommentsContext);
    const { handleSubmit, watch, register, setValue } = useForm();
    const contentErrors = watch('content');
    function onSubmit(data) {
        setValue("content", "")
        const content = data.content;
        createComment(tweet[0].tweet_id, name, content, setComments, comments, tweet, setTweet);
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            {start ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        style={{ width: '100%' }}
                        InputProps={{ style: { fontSize: 'calc(2.5vw + 5px)' } }}
                        name="content"
                        type="text"
                        multiline
                        placeholder="Add a public comment..."
                        autoComplete="off"
                        inputRef={register} />
                    {ValidateEmptiness(contentErrors) && ValidateUnneceserrySpaceUsage(String(contentErrors)) && (
                        <div style={{ float: 'right' }}>
                            <Button onClick={() => setValue("content", "")}
                                style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                                CANCEL
                            </Button>
                            <Button type='submit'
                                variant="contained"
                                color="primary"
                                style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                                COMMENT
                            </Button>
                        </div>
                    )}
                </form>
            ) : (
                    <Button className='filterButton'
                        style={{ fontSize: 'calc(2.5vw + 5px)', width: '100%' }}
                        onClick={() => { setStart(true) }}>
                        Create Comment
                    </Button>
                )}

        </div >
    )
}

export default CommentsForm;