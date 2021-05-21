import React, { useState } from 'react'
import API from "../../utils/usersAPI";
import background from "../../img/login.png"
import './Login.css'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    margin: {
      margin: theme.spacing(1),
      background: 'rgba(234, 226, 183, 1)',
      width: '30%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      background: 'rgba(234, 226, 183, 1)',
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    button: {
      background: 'rgba(234, 226, 183, 1)',
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
   buttonGoogle: {
      background: '#D62828',
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1%',
      color: 'rgb(234,226,183)'
},
  }));

function Login(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        API.postLogin({ email: userData.email.toLowerCase(), password: userData.password })
            .then(res => { 
                console.log(res)
                if (res.data.success===true){
                    window.location.href='/Platform'
                    localStorage.setItem("token", res.data.token)
                }
            })
        console.log(userData)
    }


    const userData = {
        email: email,
        password: password
    };

    const classes = useStyles();

    const [values, setValues] = React.useState({
        showPassword: false,
      });
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
    <div className="login-image" style={{ 
        backgroundImage: `url(${background})` 
        }}>

      <div className="row justify-content-center login-container"> 
        <div>
          <h4 className="login-below">
            <b>Login</b> below
          </h4>
          </div>
      </div>
      <form className="login-form" >
        <TextField
          label="Email"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          onChange={event => setEmail(event.target.value)} type="text" 
          />
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)} 
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <Button onClick={handleSubmit} className={clsx(classes.button)} type="submit" value="Submit" variant="contained">Login</Button>

          <GoogleLogin
            clientId='660891343423-bf25c65irnt4b1q1mc519tjlebukqtqk.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={clsx(classes.buttonGoogle)}
                type="submit"
                variant='contained'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}>
                Login with Google
              </Button>
            )}
            // onSuccess={googleSuccess}
            // onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
      </form>
    </div>
      
    )
}

export default Login
