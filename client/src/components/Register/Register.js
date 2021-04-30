import React from 'react';
import { useInput } from './InputHook'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
// import classnames from classnames;
import './Register.css'
import { render } from 'react-dom';

function Register(props) {
    const { value: name, bind:bindName, reset:resetName } = useInput("")
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")
    const { value: password2, bind: bindPassword2, reset: resetPassword2 } = useInput("")

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitting Name ${name} email ${email} password ${password} password verification ${password2} `);
        resetName();
        resetEmail();
        resetPassword();
        resetPassword2();
    }

    const componentWillReceiveProps = (props) => {
        if (props.erros) {
            this.setState({
                errors: this.errors
            });
        }
    }

    const newUser ={
        name: name,
        email: email,
        password: password,
        password2: password2
    };

    this.props.registerUser(newUser, this.props.history)
      
        return (
            <div>
                <div className="Container">
                    <div className="row sm-10">
                        <Link to="/" className="btn">Back to Home</Link>
                    </div>
                    <div className="col-sm-12">
                        <h4>
                            <b>Register</b> below
                    </h4>
                    </div>
                </div>
            <form onSubmit={handleSubmit}>
                <button type="submit" value="Submit" className="btn-info">Register</button>
                <label className="row">
                    Name:
                    <input onChange={useInput} type="text" {...bindName} />
                </label>
                <label className="row">
                    Email:
                    <input onChange={useInput} type="text" {...bindEmail} />
                </label>
                <label className="row">
                    Password:
                    <input onChange={useInput}  type="text" {...bindPassword} />
                </label>
                <label className="row">
                    Password Verification:
                    <input onChange={useInput}  type="text" {...bindPassword2} />
                </label>
            </form>
            </div>
        );
}

// Register.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };
        
    
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
