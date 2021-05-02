import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useInput } from '../Register/InputHook'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './loginStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux'

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        this.useInput({ [event.target.id]: event.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; 
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
        } catch(error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Login was unsucessful. Try Again");
    }

    const userData = {
        email: email.email,
        password: password.password
    };

    // const componentWillReceiveProps = (nextProps) => {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard"); // push user to dashboard when they login
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    console.log(userData)

    // this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

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
                                    <Input name ="fullName" label="Full Name" handleChange={handleChange} autoFocus half />
                                    <Input name="fullName" label="Full Name" handleChange={handleChange} half />
                                </>
                            )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                    {isSignup && <Input name ="password2" label="Confirm Password" handleChange={handleChange} type="password2"/>}
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


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
