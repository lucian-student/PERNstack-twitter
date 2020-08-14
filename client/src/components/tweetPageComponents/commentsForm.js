import React from 'react';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button
} from '@material-ui/core';
import { ValidateEmptiness, ValidateUnneceserrySpaceUsage } from '../../utils/validators'
function CommentsForm() {
    const { handleSubmit, watch, register, setValue } = useForm();
    const contentErrors = watch('content');
    function onSubmit(data) {
        console.log(data);
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