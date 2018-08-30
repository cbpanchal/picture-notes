import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { LoginForm, LoginFormContainer } from "../../style/LoginStyle";
import Loader from "../../containers/loader/Loader";
import ReduxInputs from "./ReduxInputs";
import * as validator from "../../utils/validator";

const Login = props => {
    const { handleSubmit, valid, googleLogin, isLoading } = props;
    return(
       <LoginFormContainer>
           <Loader loading={isLoading} />
           <LoginForm>
               <h1>login to picture notes</h1>
               <span>
                   or <Link to="/signup">create an account</Link>
               </span>
               <form onSubmit={handleSubmit}>
                <Field
                    name="email"
                    component={ReduxInputs}
                    type="email"
                    id="email"
                    placeholder="e.g., id@email.com"
                    label="Email"
                    validate={validator.required}
                />
                <Field
                    name="password"
                    component={ReduxInputs}
                    type="password"
                    id="password"
                    placeholder="e.g., **********"
                    label="Password"
                    validate={validator.required}
                />
                <button type="submit" disabled={!valid}>
                    Login
                </button>
               </form>
               <button onClick={googleLogin}>
                    <i className="google-logo" /> Login with Google
               </button>
           </LoginForm>
       </LoginFormContainer>
    );
};

Login.prototypes = {
    valid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

Login.defaultProps = {
    isLoading: false,
    valid: false
};

export default reduxForm({
    form: "login"
  })(Login);
  