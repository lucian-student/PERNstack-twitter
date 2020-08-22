import React, { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { setAccessToken } from '../utils/accessToken';
import { transport } from '../axios/cookieAxios';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../context/auth';

function Login() {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const { register, handleSubmit, errors } = useForm();
    const { loginUser } = useContext(AuthContext);
    async function handleLogin(data) {
        const { email, password } = data;
        return await transport
            .post('http://localhost:5000/users/login/', {
                data: { email, password },
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                loginUser();
            })
            .catch(err => console.error(err));
    }
    return (
        <Fragment >
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Paper elevation={2} className='formPaper'>
                        <div className='firstCenterDiv'>
                            <div className='secondCenterDiv'>
                                <FormLabel className='loginTitle'>
                                    <h2>Login:</h2>
                                </FormLabel>
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <InputLabel className='loginLabel'>
                                        Email
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ className: 'textFieldCss' }}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="on"
                                        inputRef={register({
                                            pattern: regEx,
                                            required: true
                                        })} />
                                    {errors.email && errors.email.type === "pattern" && (
                                        <FormHelperText className="helperText">Email has to be valid!</FormHelperText>
                                    )}
                                    {errors.email && errors.email.type === "required" && (
                                        <FormHelperText className="helperText">Email is empty!</FormHelperText>
                                    )}
                                    <InputLabel className='loginLabel'>
                                        Password
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ className: 'textFieldCss' }}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        inputRef={register({
                                            required: true,
                                            minLength: 8
                                        })} />
                                    {errors.password && errors.password.type === "required" && (
                                        <FormHelperText className="helperText">Password is empty!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "minLength" && (
                                        <FormHelperText className="helperText">Password has to be atleast 8 chars long!</FormHelperText>
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