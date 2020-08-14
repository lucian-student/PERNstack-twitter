import React, { useState, useContext } from 'react';
import {
    Button,
    FormHelperText,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ValidateEmptiness } from '../../utils/validators'
import { CommentsContext } from '../../context/comments';
function CommentsFilter() {
    const [filtering, setFiltering] = useState(false);
    const { handleSubmit, errors, register } = useForm();
    const { setQueryValues } = useContext(CommentsContext);
    /*
      query: 'general',
            page: 0,
            sortValue: null
            */
    function onSubmit(data) {
        switch (data.sort) {
            case 'newest':
                setQueryValues({
                    query: 'general',
                    page: 0,
                    sortValue: null
                });
                break;
            case 'lowest':
                setQueryValues({
                    query: 'likes',
                    page: 0,
                    sortValue: false
                });
                break;
            case 'heighest':
                setQueryValues({
                    query: 'likes',
                    page: 0,
                    sortValue: true
                });
                break;
            default:
                console.log('failed')
        }


    }
    return (
        <div>
            {!filtering ? (
                <Button className='filterButton'
                    onClick={() => { setFiltering(true) }}>
                    Filters
                </Button>
            ) : (
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <FormControl >
                                    <InputLabel htmlFor="sort-native-simple">Search</InputLabel>
                                    <Select
                                        native
                                        inputProps={{
                                            name: 'sort',
                                            id: 'sort-native-simple',
                                        }}
                                        inputRef={register({
                                            validate: {
                                                positive: value => ValidateEmptiness(String(value))
                                            }
                                        })}>
                                        <option aria-label="None" value="" />
                                        <option value='heighest'>Heighest Likes</option>
                                        <option value='lowest'>Lowest Likes</option>
                                        <option value='newest'>Newest</option>
                                    </Select>
                                    {errors.sort && errors.sort.type === "positive" && (
                                        <FormHelperText className="errorText">Empty String!</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                            <Button className='filterButton2'
                                onClick={() => { setFiltering(false) }}>
                                Cancel
                            </Button>
                            <Button type='submit' className='filterButton2'>
                                Submit
                            </Button>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default CommentsFilter;