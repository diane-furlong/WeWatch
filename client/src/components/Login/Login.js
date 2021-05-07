import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { useInput } from '../Register/InputHook'
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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      background: 'rgba(234, 226, 183, 1)',
      width: '40%',
    },
    button: {
      background: 'rgba(234, 226, 183, 1)',
      width: '81.5%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '8px',

    }
  }));

function Login(){
    // const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    // const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        API.postLogin({ email: userData.email.toLowerCase(), password: userData.password })
            .then(res => { 
                console.log(res)
                if (res.data.success===true){
                    window.location.href='/Watching'
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

            <div className=" row justify-content-center login-container"> 
                <div className="">
                    <h4 className="login-below">
                        <b>Login</b> below
                    </h4>
                  </div>
            </div>
            <form className="login-form" >
            <TextField
                        label="Name"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        onChange={event => setEmail(event.target.value)} type="text" 
                        />
                {/* <label className="login-info">
                    Email:
                    <input onChange={event => setEmail(event.target.value)} type="text" 
                    // {...bindEmail} 
                    />
                </label> */}
                <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
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

                {/* <label className="login-info">
                    Password:
                    <input onChange={event => setPassword(event.target.value)} type="password" 
                    // {...bindPassword} 
                    />
                  </label> */}

<Button onSubmit={handleSubmit} className={clsx(classes.button)} type="submit" value="Submit" variant="contained">Login</Button>
                {/* <button type="submit" value="Submit" onClick={handleSubmit} className="login-btn">Login</button> */}

            </form>
        </div>
      
    )
}

export default Login
