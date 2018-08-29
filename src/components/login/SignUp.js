import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SignUp = props => {
    const { handleInput, signUp } = props;
    return(
        <div className="container">
            <div className="LoginContainer">
                <h1>SignUp</h1>
                <input id="email" type="email" placeholder="Email" name="email" onChange={handleInput}/>
                <input id="password" type="password" placeholder="Password" name="password" onChange={handleInput}/>
                <button id="btnLogin" className="btn btn-action" onClick={signUp}>SignUp</button>
                <Link to="/login">
                    <button id="btnSignUp" className="btn btn-secondary">Login</button>
                </Link> 
                {/* <button id="btnSignUp" className="btn btn-action hidden">Log out</button> */}
            </div>
        </div>
    );
};

export default SignUp;