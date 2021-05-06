import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { useInput } from '../Register/InputHook'
import API from "../../utils/usersAPI";
import background from "../../img/login.png"
import './Login.css'

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

    

    return (
        <div className="login-image" style={{ 
            backgroundImage: `url(${background})` 
          }}>

            <div className="login-container">
                <div className="">
                    <Link  to="/" className="login-home-btn">Back to Home</Link>
                </div>  
                <div className="">
                    <h4 className="login-below">
                        <b>Login</b> below
                    </h4>
                  </div>
            </div>
            <form className="login-form">
                <label className="login-info">
                    Email:
                    <input onChange={event => setEmail(event.target.value)} type="text" 
                    // {...bindEmail} 
                    />
                </label>
                <label className="login-info">
                    Password:
                    <input onChange={event => setPassword(event.target.value)} type="text" 
                    // {...bindPassword} 
                    />
                </label>
                <button type="submit" value="Submit" onClick={handleSubmit} className="login-btn">Login</button>

            </form>
            <div className="register-link">
                    <p className="login-account">Don't have an account? 
                    <Link to="/register"> Register</Link></p>
                    </div>
        </div>
      
    )
}

export default Login
