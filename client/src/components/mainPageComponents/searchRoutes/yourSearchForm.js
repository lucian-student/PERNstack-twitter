import React, { useContext } from 'react';
import { FilterContext } from '../../../context/filter';
import {
    Button,
    FormHelperText,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core';
import { ValidateEmptiness } from '../../../utils/validators';
import { useForm } from 'react-hook-form';
function YourSearchForm({ properties: { setRoute, setSearching } }) {
    const { yourFilters, setYourQueryValues } = useContext(FilterContext);
    const { register, handleSubmit, errors } = useForm();

    function checkSortValue(data) {
        if (data.comments) {
            if (data.comments === 'heighest') {
                return true;
            } else {
                return false;
            }
        } else if (data.likes) {
            if (data.likes === 'heighest') {
                return true;
            } else {
                return false;
            }
        }
    }

    async function onSubmit(data) {
        //some query
        if (data.likes) {
            setYourQueryValues({
                query: 'likes',
                page: 0,
                sortValue: checkSortValue(data)
            });
        } else if (data.comments) {
            setYourQueryValues({
                query: 'comments',
                page: 0,
                sortValue: checkSortValue(data)
            });
        }
        setRoute('select');
        setSearching(false);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {yourFilters.num_of_likes && (
                    <div>
                        <FormControl >
                            <InputLabel htmlFor="like-native-simple">Likes</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'likes',
                                    id: 'like-native-simple',
                                }}
                                inputRef={register({
                                    validate: {
                                        positive: value => ValidateEmptiness(String(value))
                                    }
                                })}>
                                <option aria-label="None" value="" />
                                <option value='heighest'>Heighest</option>
                                <option value='lowest'>Lowest</option>
                            </Select>
                            {errors.likes && errors.likes.type === "positive" && (
                                <FormHelperText className="errorText">Empty String!</FormHelperText>
                            )}
                        </FormControl>
                    </div>
                )}
                <div>
                    {yourFilters.num_of_comments && (
                        <div>
                            <FormControl >
                                <InputLabel htmlFor="comment-native-simple">Comments</InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        name: 'comments',
                                        id: 'comment-native-simple',
                                    }}
                                    inputRef={register({
                                        validate: {
                                            positive: value => ValidateEmptiness(String(value))
                                        }
                                    })}>
                                    <option aria-label="None" value="" />
                                    <option value='heighest'>Heighest</option>
                                    <option value='lowest'>Lowest</option>
                                </Select>
                                {errors.comments && errors.comments.type === "positive" && (
                                    <FormHelperText className="errorText">Empty String!</FormHelperText>
                                )}
                            </FormControl>
                        </div>
                    )}
                </div>
                <div>
                    <Button className='searchButtons'
                        onClick={() => {
                            setRoute('select');
                            setSearching(false)
                        }}>
                        Cancel Search
                    </Button>
                    <Button className='searchButtons'
                        type='submit'>
                        Next
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default YourSearchForm;