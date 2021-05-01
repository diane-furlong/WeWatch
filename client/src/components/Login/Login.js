import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useInput } from '../Register/InputHook'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './loginStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const isSignup = false;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        this.useInput({ [event.target.id]: event.target.value })
    }

    const userData = {
        email: email.email,
        password: password.password
    };

    const componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    console.log(userData)

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

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
