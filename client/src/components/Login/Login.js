import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { useInput } from '../Register/InputHook'
import API from "../../utils/usersAPI";

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

    // const onChangeLogin = (event) => {
    //     this.useInput({ [event.target.id]: event.target.value })
    // }

    const userData = {
        email: email,
        password: password
    };

    

    return (
        <div>
            <div className="Container">
                <div className="row sm-10">
                    <Link  to="/" className="btn">Back to Home</Link>
                </div>
                <div className="col-sm-12">
                    <h4>
                        <b>Login</b> below
                    </h4>
                    <div className="col-sm-12">
                    <p className="grey-text text-darken-1">Don't have an account? 
                    <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
            <form>
                <label>
                    Email:
                    <input onChange={event => setEmail(event.target.value)} type="text" 
                    // {...bindEmail} 
                    />
                </label>
                <label>
                    Password:
                    <input onChange={event => setPassword(event.target.value)} type="text" 
                    // {...bindPassword} 
                    />
                </label>
                <button type="submit" value="Submit" onClick={handleSubmit} className="btn btn-large">Login</button>

            </form>
        </div>
    )
}

export default Login
