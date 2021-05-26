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
import usersAPI from '../../utils/usersAPI';

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

    }
}));

function Login(){

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function handleSubmit (event) {
      event.preventDefault();
      if (!email || !password){
        alert("Please enter your email and password. If you do not have a login, please register.")
      } else {
      API.postLogin({ email: userData.email.toLowerCase(), password: userData.password })
          .then(res => { 
              if (res.data.success===true){
                localStorage.setItem("token", res.data.token)
              }
          }
        )
        .then(nextPage)
        
        async function nextPage(){
          let usertoken = localStorage.getItem("token")
            usertoken = usertoken?.split(" ")
            let usertokenArray = []
            if(usertoken){
                for(let i =0; i < usertoken.length; i++){
                    usertokenArray.push(usertoken[i])
                    if(i !== usertoken.length-1){
                        usertokenArray.push(" ");
                    }
                }
            }
            const id = usertokenArray[2]
            
            const userInfo = await usersAPI.getUser(id)
            const userPlatforms = userInfo.data.platforms
            if(userPlatforms.length === 0){
              window.location.href="/Platform"
            } else {
              window.location.href="/Profile"
            }
        }
      }
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
      </form>
    </div>
      
    )
}

export default Login
