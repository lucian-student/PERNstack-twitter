import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { FilterContext } from '../../context/filter';
import { editTweet } from '../../queries/tweetsQuery/tweetsQuery';
function TweetEditForm({ tweet: { content, setEditing, index, tweet_id } }) {
    const { handleSubmit, watch, register } = useForm();
    const { yourTweets, setYourTweets, generalTweets, setGeneralTweets, route } = useContext(FilterContext);
    const contentErrors = watch('content');
    function onSubmit(data) {
        const content = data.content;
        if (route === 'general') {
            editTweet(index, tweet_id, content, setGeneralTweets, generalTweets);
        } else {
            editTweet(index, tweet_id, content, setYourTweets, yourTweets);
        }
        setEditing(false);
    }
    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    style={{ width: '100%' }}
                    InputProps={{ className: 'textFieldCss' }}
                    name="content"
                    type="text"
                    multiline
                    placeholder="Create Tweet..."
                    autoComplete="off"
                    defaultValue={content}
                    inputRef={register} />



                <div style={{ float: 'right', }}>
                    <Button onClick={() => { setEditing(false) }}
                        className='formButton'>
                        CANCEL
                     </Button>
                    <Button
                        disabled={!(ValidateEmptiness(contentErrors) && ValidateUnneceserrySpaceUsage(String(contentErrors)))}
                        type='submit'
                        variant="contained"
                        color="primary"
                        className='formButton'>
                        COMMENT
                    </Button>
                </div>

            </form>
        </div >
    )
}


export default TweetEditForm;