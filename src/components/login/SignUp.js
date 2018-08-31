import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { LoginForm, LoginFormContainer } from "../../style/LoginStyle";
import ReduxInputs from "./ReduxInputs";
import Loader from "../../containers/loader/Loader";
import * as validator from "../../utils/validator";

const SignUp = props => {
  const { handleSubmit, valid, password, isLoading } = props;
  return (
    <LoginFormContainer>
      <Loader loading={isLoading} />
      <LoginForm>
        <h1>Create a Picture Notes Account </h1>
        <span>
          or <Link to="/login">Sign in to your account </Link>
        </span>
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={ReduxInputs}
            type="email"
            id="email"
            placeholder="e.g., id@email.com"
            label="Email"
            validate={[validator.required, validator.email]}
          />
          <Field
            name="password"
            component={ReduxInputs}
            type="password"
            id="password"
            placeholder="e.g., **********"
            label="Password"
            validate={[validator.required, validator.minLength6]}
          />
          <Field
            name="confirmPassword"
            component={ReduxInputs}
            type="password"
            id="confirmPassword"
            placeholder="e.g., **********"
            label="Confirm password"
            password={password}
            validate={[
              validator.required,
              validator.minLength6,
              validator.confirmPasswordValidation
            ]}
          />
          <button type="submit" disabled={!valid}>
            Create New Account
          </button>
        </form>
      </LoginForm>
    </LoginFormContainer>
  );
};

SignUp.propTypes = {
  valid: PropTypes.bool,
  isLoading: PropTypes.bool,
  password: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

SignUp.defaultProps = {
  valid: false,
  isLoading: false,
  password: ""
};

export default reduxForm({
  form: "signup"
})(SignUp);
