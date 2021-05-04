import React from 'react';
import { useInput } from './InputHook'
import { Link } from 'react-router-dom';
import './Register.css';
import API from "../../utils/usersAPI";
import img from "../../img/movie.png";

function Register(props) {
    const { value: name, bind:bindName, reset:resetName } = useInput("")
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")
    const { value: password2, bind: bindPassword2, reset: resetPassword2 } = useInput("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {email: email.toLowerCase(), password: password, name: name, password2: password2 }
        console.log(data)
        API.postUser({ 
            email: email.toLowerCase(), password: password, name: name, password2: password2 
        }).then(res => {
            console.log(res.data)
            resetName();
            resetEmail();
            resetPassword();
            resetPassword2();
            window.location.href='/Platform'
        })
        // alert(`Submitting Name ${name} email ${email} password ${password} password verification ${password2} `);
        
    }
    
      
        return (
            <div className="register-image" style={{ 
                backgroundImage: `url(${img})` 
              }}>
                <div className="Container">
                    <div className="register-row sm-10">
                        <Link to="/" className="register-btn">Back to Home</Link>
                    </div>
                    <div className="col-sm-12">
                        <h4 className="register-row"> 
                            <b>Register</b>below
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
                    Password:
                    <input onChange={useInput}  type="text" {...bindPassword} />
                </label>
                <label className="register-row">
                    Password Verification:
                    <input onChange={useInput}  type="text" {...bindPassword2} />
                </label>
                <button type="submit" value="Submit" className="btn-info">Register</button>
            </form>
            </div>
            
        );
}
        
    


export default Register
