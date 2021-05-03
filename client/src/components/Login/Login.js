import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './loginStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux'
import { login, signup } from '../../actions/authActions'


const initialState = { name: '', email: '', password: '', password2: ''}

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)


    const handleSubmit = (event) => {
        event.preventDefault();
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(login(formData, history))
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch(error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Login was unsucessful. Try Again");
    }

    return (
        <Container component ="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Login'} </Typography>
                <form className= {classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing ={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name ="fullName" label="Full Name" handleChange={handleChange} autoFocus />
                                </>
                            )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    { isSignup && <Input name ="password2" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Button>
                    <GoogleLogin 
                        clientId='660891343423-bf25c65irnt4b1q1mc519tjlebukqtqk.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                 className ={classes.googleButton}
                                 color='primary'
                                 fullWidth 
                                 onClick={renderProps.onClick}
                                 disabled={renderProps.disabled}
                                 startIcon={<Icon />}
                                 variant='contained'
                                >
                                    Google Login
                                </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account ? Login' : "Don't have an account? Sign Up!"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>

        </Container>

    )

}


export default Login
