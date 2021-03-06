import React, { useContext } from 'react';
import { FilterContext } from '../../../context/filter';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
                                InputProps={{ className: 'textFieldCss' }}
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
                                <FormHelperText className="helperText">Empty String!</FormHelperText>
                            )}
                        </div>
                    )}
                </div>
                {filters.num_of_likes && (
                    <div>
                        <FormControl >
                            <InputLabel htmlFor="like-native-simple"
                                style={{ className: 'textFieldCss' }} >Likes</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'likes',
                                    id: 'like-native-simple',
                                    className: 'textFieldCss'
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
                                <FormHelperText className="helperText">Empty String!</FormHelperText>
                            )}
                        </FormControl>
                    </div>
                )}
                <div>
                    {filters.num_of_comments && (
                        <div>
                            <FormControl >
                                <InputLabel htmlFor="comment-native-simple"
                                    className='textFieldCss' >Comments</InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        name: 'comments',
                                        id: 'comment-native-simple',
                                        className: 'textFieldCss'
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
                                    <FormHelperText className="helperText">Empty String!</FormHelperText>
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
                        Cancel
                    </Button>
                    <Button className='searchButtons'
                        type='submit'>
                        Next
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default SearchForm;