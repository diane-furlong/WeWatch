import React, { useState } from 'react';
import { useInput } from './InputHook'
import './Register.css';
import API from "../../utils/usersAPI";
import img from "../../img/movie.png";
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
      width: '100%',
    },
    button: {
      background: 'rgba(234, 226, 183, 1)',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '8px',
    }
  }));

function Register() {
    const { value: name, bind:bindName, reset:resetName } = useInput("")
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")
    const { value: password2, bind: bindPassword2, reset: resetPassword2 } = useInput("")
    const [checkErr, setErr] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {email: email.toLowerCase(), password: password, name: name, password2: password2}
        API.postUser({ 
            email: email.toLowerCase(), password: password, name: name, password2: password2 
        }).then(res => {
            resetName();
            resetEmail();
            resetPassword();
            resetPassword2();
            window.location.href='/Platform'
        }).catch(err => {
            setErr(err)
        })
    }

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
            <div className="register-image" style={{ 
                backgroundImage: `url(${img})` 
              }}>
                <div className="Container">
                    <div className="col-sm-12">
                        <h4 className="register-row"> 
                            Register below
                    </h4>
                    </div>
                </div>

        

            <form className="register-form" onSubmit={handleSubmit}>

                <TextField
                        label="Name"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        onChange={useInput} type="text" {...bindName}
                        />
                {/* <label className="register-row">
                    Name:
                    <input onChange={useInput} type="text" {...bindName} />
                </label> */}

            <TextField
                                    label="Email"
                                    id="outlined-start-adornment"
                                    className={clsx(classes.margin, classes.textField)}
                                    variant="outlined"
                                    onChange={useInput} type="text" {...bindEmail}
                                    />

{/* 
                <label className="register-row">
                    Email:
                    <input onChange={useInput} type="text" {...bindEmail} />
                </label> */}

                <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={useInput} {...bindPassword}
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
               
                {/* <label className="register-row">
                    Password:
                    <input onChange={useInput}  type="text" {...bindPassword} />
                </label> */}

                <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Verify Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password2}
                        onChange={useInput} {...bindPassword2}
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

                {/* <label className="register-row">
                    Password Verification:
                    <input onChange={useInput}  type="text" {...bindPassword2} />
                </label> */}
                {/* <button type="submit" value="Submit" className="btn-info">Register</button> */}
                <Button  className={clsx(classes.button)} type="submit" value="Submit" variant="contained">Register</Button>
            </form>
           
        
        <br/>
        <br/>
        {checkErr !== false ? <p className="err">Do you already have an account? If so, please <a href="/login">log in</a>. <br/> If not, confirm that your password is at least 6 characters and that password verification matches.</p>:null}
        </div>
       
    )
}
        
    


export default Register
