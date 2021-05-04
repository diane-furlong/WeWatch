import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'; //we will also need to download material ui core and add 
import { GoogleLogin } from 'react-google-login'; //this is for google login
import useStyles from './loginStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './icon'; //import the icon svg fo the google login
import { useDispatch } from 'react-redux' // we will have to have this for the google button we will also need 
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
        console.log(formData)
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(login(formData, history))
            console.log(formData)
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {  // googleSuccess and google failure will need to be added for the google button
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
                                    <Input name ="name" label="Full Name" handleChange={handleChange} autoFocus />
                                </>
                            )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    { isSignup && <Input name ="password2" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Button>
                    <GoogleLogin  //this is the google login aspect
                        clientId='660891343423-bf25c65irnt4b1q1mc519tjlebukqtqk.apps.googleusercontent.com' // this is from the google site we will also need to know how to deploy this
                        render={(renderProps) => (
                            <Button
                                 className ={classes.googleButton}
                                 color='primary' // we will also need loginstyles at least the google button part
                                 fullWidth 
                                 onClick={renderProps.onClick}
                                 disabled={renderProps.disabled}
                                 startIcon={<Icon />} //icon needs to be imported
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
