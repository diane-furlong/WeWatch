import React from 'react';
import  "./Landing.css"
import ParticlesBg from 'particles-bg'


const Landing = () => {
    const onClickRegister = () => {
        window.location.href='/register'
    }
    const onClickLogin = () => {
        window.location.href='/login'
    }

    return (
        <>
        <div className="container center">
            <div className = "row">
                <div className = "col-sm-12 center-align">
                    <h4>
                        <b>weWatch...</b> share what you are watching!
                    </h4>
                        <button onClick={event => onClickRegister(event)} className="btn btn-primary btn-lg">Register</button>
                        <br></br>
                    <button onClick={event => onClickLogin(event)} className="btn btn-success btn-lg">Login</button>
                </div>
            </div>
            
        </div>
        <ParticlesBg type="cobweb" bg={true} />
        </>
    )
}

export default Landing