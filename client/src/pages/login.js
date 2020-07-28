import React, { Fragment } from 'react';
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

function Login() {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const { register, handleSubmit, errors } = useForm();
    async function handleLogin(data) {
        const { email, password } = data;
        return await transport
            .post('http://localhost:5000/users/login/', {
                data: { email, password },
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                console.log(res.data.accessToken)
            })
            .catch(err => console.error(err));
    }
    return (
        <Fragment >
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '70%' }}>
                    <Paper elevation={2} className='formPaper'>
                        <div style={{ display: "flex" }}>
                            <div style={{ margin: "auto", width: '70%' }}>
                                <FormLabel>
                                    <h2>Login:</h2>
                                </FormLabel>
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <InputLabel>
                                        Email
                                    </InputLabel>
                                    <TextField
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="on"
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
                                            minLength: 8
                                        })} />
                                    {errors.password && errors.password.type === "required" && (
                                        <FormHelperText className="errorText">Password is empty!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "minLength" && (
                                        <FormHelperText className="errorText">Password has to be atleast 8 chars long!</FormHelperText>
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

export default Login;