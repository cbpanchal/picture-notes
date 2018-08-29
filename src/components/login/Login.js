import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = props => {
    const { handelInput , login} = props;
    return(
        <div className="container">
            <div className="LoginContainer">
                <h1>Login</h1>
                <input id="email" type="email" placeholder="Email" name="email" onChange={handelInput}/>
                <input id="password" type="password" placeholder="Password" name="password" onChange={handelInput}/>
                <button id="btnLogin" className="btn btn-action" onClick={login}>Login</button>
                <Link to="/signup">
                    <button id="btnSignUp" className="btn btn-secondary">SignUp</button>
                </Link> 
                {/* <button id="btnSignUp" className="btn btn-action hidden">Log out</button> */}
            </div>
        </div>
    );
};

export default Login;