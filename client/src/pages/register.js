import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setAccessToken } from '../utils/accessToken';
import {transport} from '../axios/cookieAxios';
import {
    TextField,
    FormHelperText,
    Button,
    Paper,
    FormLabel,
    InputLabel
} from '@material-ui/core';
import { ValidateUnneceserrySpaceUsage, ValidateTextInput } from '../utils/validators';
function Register() {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const [valdiPassword, setValidPassword] = useState(true);
    const { register, handleSubmit, errors } = useForm();

    async function handleRegister(data) {
        const { email, password, username, confirmpassword } = data;
        if (password === confirmpassword) {
            setValidPassword(true);
            return await transport
                .post('http://localhost:5000/users/register/', {
                    data: { email, password, username, confirmpassword },
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    console.log(res.data.accessToken)
                })
                .catch(err => console.error(err));
        } else {
            setValidPassword(false);
        }
    }
    return (
        <Fragment >
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    <Paper elevation={2} className='formPaper'>
                        <div style={{ display: "flex" }}>
                            <div style={{ margin: "auto", width: '70%' }}>
                                <FormLabel>
                                    <h2>Create new account:</h2>
                                </FormLabel>
                                <form onSubmit={handleSubmit(handleRegister)}>
                                    <InputLabel>
                                        Username
                                    </InputLabel>
                                    <TextField
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        autoComplete="off"
                                        inputRef={register({
                                            required: true,
                                            minLength: 3,
                                            validate: {
                                                positive: value => ValidateTextInput(String(value)),
                                                positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                            }
                                        })} />
                                    {errors.username && errors.username.type === "required" && (
                                        <FormHelperText className="errorText">Username is empty!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "minLength" && (
                                        <FormHelperText className="errorText">Username has to be atleast 3 chars long!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "positive" && (
                                        <FormHelperText className="errorText">Dont use space at start and end!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "positive2" && (
                                        <FormHelperText className="errorText">Dont use more than one space in row!</FormHelperText>
                                    )}
                                    <InputLabel>
                                        Email
                                    </InputLabel >
                                    <TextField
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        inputRef={register({
                                            pattern: regEx,
                                            required: true
                                        })} />
                                    {errors.email && errors.email.type === "pattern" && (
                                        <FormHelperText className="errorText">Email has to be valid!</FormHelperText>
                                    )}
                                    {errors.email && errors.email.type === "required" && (
                                        <FormHelperText className="errorText">Email is empty!</FormHelperText>
                                    )}
                                    <InputLabel>
                                        Password
                                    </InputLabel>
                                    <TextField
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        inputRef={register({
                                            required: true,
                                            minLength: 8,
                                            validate: {
                                                positive: value => ValidateTextInput(String(value)),
                                                positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                            }
                                        })} />
                                    {errors.password && errors.password.type === "required" && (
                                        <FormHelperText className="errorText">Password is empty!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "minLength" && (
                                        <FormHelperText className="errorText">Password has to be atleast 8 chars long!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "positive" && (
                                        <FormHelperText className="errorText">Dont use space at start and end!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "positive2" && (
                                        <FormHelperText className="errorText">Dont use more than one space in row!</FormHelperText>
                                    )}
                                    <InputLabel>
                                        Confirm Password
                                    </InputLabel>
                                    <TextField
                                        name="confirmpassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        autoComplete="off"
                                        inputRef={register({
                                            required: true,
                                            minLength: 8,
                                        })} />
                                    {errors.confirmpassword && errors.confirmpassword.type === "required" && (
                                        <FormHelperText className="errorText">Confirm Password is empty!</FormHelperText>
                                    )}
                                    {errors.confirmpassword && errors.confirmpassword.type === "minLength" && (
                                        <FormHelperText className="errorText">Confirm Password has to be atleast 8 chars long!</FormHelperText>
                                    )}
                                    {!valdiPassword && (
                                        <FormHelperText>Password doesnt match!</FormHelperText>
                                    )}
                                    <Button type='submit' className='submitButton' style={{ backgroundColor: '#82E0AA' }}>
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </Fragment>
    )
}
export default Register;