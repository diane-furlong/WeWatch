import React from 'react'
import { Link } from 'react-router-dom';
import { useInput } from '../Register/InputHook'

function Login(props){
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const onChangeLogin = (event) => {
        this.useInput({ [event.target.id]: event.target.value })
    }

    const userData = {
        email: email.email,
        password: password.password
    };

    console.log(userData)

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
                    <p className="grey-text text-darken-1">Don't have and account?
                    <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input onChange={onChangeLogin} type="text" {...bindEmail} />
                </label>
                <label>
                    Password:
                    <input onChange={onChangeLogin} type="text" {...bindPassword} />
                </label>
                <button type="submit" value="Submit" className="btn btn-large">Login</button>

            </form>
        </div>
    )
}

export default Login
