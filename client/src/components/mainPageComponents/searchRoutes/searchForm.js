import React, { useContext } from 'react';
import { FilterContext } from '../../../context/filter';
import { useForm } from 'react-hook-form';
import {
    Button,
    TextField,
    FormHelperText,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core';
import { ValidateEmptiness } from '../../../utils/validators';
function SearchForm({ properties: { setRoute, setSearching } }) {
    const { filters, setGeneralQueryValues } = useContext(FilterContext);
    const { register, handleSubmit, errors } = useForm();

    function checkSortValue(data) {
        if (data.comments) {
            if (data.comments === 'heighest') {
                return true;
            } else {
                return false
            }
        } else if (data.likes) {
            if (data.likes === 'heighest') {
                return true;
            } else {
                return false
            }
        }
    }

    async function onSubmit(data) {
        if (data.username) {
            if (data.comments) {
                setGeneralQueryValues({
                    query: 'username_comments',
                    sortValue: checkSortValue(data),
                    page: 0,
                    username: data.username
                });
            } else if (data.likes) {
                setGeneralQueryValues({
                    query: 'username_likes',
                    sortValue: checkSortValue(data),
                    page: 0,
                    username: data.username
                });
            } else {
                setGeneralQueryValues({
                    sortValue: null,
                    query: 'username',
                    page: 0,
                    username: data.username
                });
            }
        } else if (data.comments) {
            setGeneralQueryValues({
                query: 'comments',
                sortValue: checkSortValue(data),
                page: 0,
                username: null
            });
        } else if (data.likes) {
            setGeneralQueryValues({
                query: 'likes',
                sortValue: checkSortValue(data),
                page: 0,
                username: null
            });
        }
        setRoute('select');
        setSearching(false);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {filters.username && (
                        <div>
                            <TextField
                                InputProps={{ style: { fontSize: 'calc(2vw + 5px)' } }}
                                type='text'
                                placeholder='Username'
                                name='username'
                                autoComplete="on"
                                inputRef={register({
                                    validate: {
                                        positive: value => ValidateEmptiness(String(value))
                                    }
                                })} />
                            {errors.username && errors.username.type === "positive" && (
                                <FormHelperText className="errorText">Empty String!</FormHelperText>
                            )}
                        </div>
                    )}
                </div>
                {filters.num_of_likes && (
                    <div>
                        <FormControl >
                            <InputLabel htmlFor="like-native-simple"
                                style={{ fontSize: 'calc(2vw + 5px)' }} >Likes</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'likes',
                                    id: 'like-native-simple',
                                    style: { fontSize: 'calc(2vw + 5px)' }
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
                    {filters.num_of_comments && (
                        <div>
                            <FormControl >
                                <InputLabel htmlFor="comment-native-simple"
                                    style={{ fontSize: 'calc(2vw + 5px)' }} >Comments</InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        name: 'comments',
                                        id: 'comment-native-simple',
                                        style: { fontSize: 'calc(2vw + 5px)' }
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
                        }}
                        style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                        Cancel
                    </Button>
                    <Button className='searchButtons'
                        type='submit'
                        style={{ fontSize: 'calc(1.5vw + 5px)' }}>
                        Next
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default SearchForm;