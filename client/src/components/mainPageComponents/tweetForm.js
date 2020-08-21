import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { createTweet } from '../../queries/tweetsQuery/tweetsQuery';
import { AuthContext } from '../../context/auth';
import { FilterContext } from '../../context/filter';
function TweetForm() {
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(false);
    const { currentUser: { name } } = useContext(AuthContext);
    const { yourTweets, setYourTweets } = useContext(FilterContext);
    const { handleSubmit, watch, register, setValue } = useForm();
    const contentErrors = watch('content');
    function onSubmit(data) {
        setValue("content", "")
        const content = data.content;
        createTweet(content, name, setYourTweets, yourTweets);;
    }
    function Valid(data) {
        const valid1 = ValidateUnneceserrySpaceUsage(String(data));
        const valid2 = ValidateEmptiness(String(data));

        return valid1 && valid2 && !loading;
    }
    useEffect(() => {
        setLoading(false);
    }, []);

    //.MuiTextField-root
    return (
        <div style={{ overflow: 'hidden' }}>
            {start ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        style={{ width: '100%' }}
                        InputProps={{ className: 'textFieldCss' }}
                        name="content"
                        type="text"
                        multiline
                        placeholder="Create Tweet..."
                        autoComplete="off"
                        inputRef={register} />
                    {contentErrors && (
                        <div style={{ float: 'right' }}>
                            <Button onClick={() => setValue("content", "")}
                                className='formButton'>
                                CANCEL
                     </Button>
                            <Button disabled={!Valid(contentErrors)}
                                type='submit'
                                variant="contained"
                                color="primary"
                                className='formButton'>
                                COMMENT
                    </Button>
                        </div>
                    )}
                </form>
            ) : (
                    <Button className='filterButton'
                        onClick={() => { setStart(true) }}>
                        Create Tweet
                    </Button>
                )}

        </div >
    )
}

export default TweetForm;