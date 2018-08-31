/* eslint jsx-a11y/label-has-for: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import SignUp from "../../components/login/SignUp";
import * as action from "../../actions/loginAction";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(formValues) {
    const { signup } = this.props;
    const { email, password, confirmPassword } = formValues;
    if (password === confirmPassword) {
      signup({
        email,
        password
      });
    }
  }

  render() {
    const { isLoading } = this.props;
    return <SignUp onSubmit={this.signUp} isLoading={isLoading} />;
  }
}

SignUpContainer.propTypes = {
  signup: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

SignUpContainer.defaultProps = {
  isLoading: false
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signup: action.signup
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
