import React, { Fragment, useState, useContext } from 'react';
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
import { ValidateUnneceserrySpaceUsage, ValidateTextInput } from '../utils/validators';
function Register() {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const [valdiPassword, setValidPassword] = useState(true);
    const { register, handleSubmit, errors } = useForm();
    const { loginUser } = useContext(AuthContext);
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
                    loginUser();
                })
                .catch(err => console.error(err));
        } else {
            setValidPassword(false);
        }
    }
    return (
        <Fragment >
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Paper elevation={2} className='formPaper'>
                        <div className='firstCenterDiv'>
                            <div className='secondCenterDiv'>
                                <FormLabel className='loginTitle'>
                                    <h2>Create new account:</h2>
                                </FormLabel>
                                <form onSubmit={handleSubmit(handleRegister)}>
                                    <InputLabel className='loginLabel'>
                                        Username
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ className: 'textFieldCss' }}
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
                                        <FormHelperText className="helperText">Username is empty!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "minLength" && (
                                        <FormHelperText className="helperText">Username has to be atleast 3 chars long!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "positive" && (
                                        <FormHelperText className="helperText">Dont use space at start and end!</FormHelperText>
                                    )}
                                    {errors.username && errors.username.type === "positive2" && (
                                        <FormHelperText className="helperText">Dont use more than one space in row!</FormHelperText>
                                    )}
                                    <InputLabel className='loginLabel'>
                                        Email
                                    </InputLabel >
                                    <TextField
                                        InputProps={{ className: 'textFieldCss' }}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="off"
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
                                            minLength: 8,
                                            validate: {
                                                positive: value => ValidateTextInput(String(value)),
                                                positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                            }
                                        })} />
                                    {errors.password && errors.password.type === "required" && (
                                        <FormHelperText className="helperText">Password is empty!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "minLength" && (
                                        <FormHelperText className="helperText">Password has to be atleast 8 chars long!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "positive" && (
                                        <FormHelperText className="helperText">Dont use space at start and end!</FormHelperText>
                                    )}
                                    {errors.password && errors.password.type === "positive2" && (
                                        <FormHelperText className="helperText">Dont use more than one space in row!</FormHelperText>
                                    )}
                                    <InputLabel className='loginLabel'>
                                        Confirm Password
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ className: 'textFieldCss' }}
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