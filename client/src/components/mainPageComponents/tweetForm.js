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
                        InputProps={{ style: { fontSize: 'calc(2vw + 5px)' } }}
                        name="content"
                        type="text"
                        multiline
                        placeholder="Create Tweet..."
                        autoComplete="off"
                        inputRef={register} />
                    {Valid(contentErrors) && (
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
                        Create Tweet
                    </Button>
                )}

        </div >
    )
}

export default TweetForm;