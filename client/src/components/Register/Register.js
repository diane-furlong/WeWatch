import React, { useState } from 'react';
import { useInput } from './InputHook'
import './Register.css';
import API from "../../utils/usersAPI";
import img from "../../img/movie.png";

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
    
      
    return (
        <>
        <div className="register-image" style={{ 
            backgroundImage: `url(${img})` 
        }}>
        <div className="Container">
            <div className="col-sm-12">
                <h4 className="register-row"> 
                    <b>Register</b> below
                </h4>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <label className="register-row">
                Name:
                <input onChange={useInput} type="text" {...bindName} />
            </label>
            <label className="register-row">
                Email:
                <input onChange={useInput} type="text" {...bindEmail} />
            </label>
            <label className="register-row">
                Password (must be at least 6 characters):
                <input onChange={useInput}  type="text" {...bindPassword} />
            </label>
            <label className="register-row">
                Password Verification:
                <input onChange={useInput}  type="text" {...bindPassword2} />
            </label>
            <button type="submit" value="Submit" className="btn-info">Register</button>
        </form>
        <br/>
        <br/>
        {checkErr !== false ? <p className="err">Do you already have an account? If so, please <a href="/login">log in</a>. <br/> If not, confirm that your password is at least 6 characters and that password verification matches.</p>:null}
        </div>
        </>
    )
}
        
    


export default Register
