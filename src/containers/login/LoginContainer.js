import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Login from "../../components/login/Login";
import * as action from "../../actions/loginAction";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this); 
        this.googleLogin = this.googleLogin.bind(this);
    }

    login(formValues) {
        const { login } = this.props;
        const { email, password } = formValues;
        login ({
            email,
            password
        });
    }       

    googleLogin() {
        const { googleLogin } = this.props;
        googleLogin()
    }

    render() {
        const { isLoading } = this.props;
        return (
            <Login 
              onSubmit={this.login} 
              googleLogin ={this.googleLogin}
              isLoading={isLoading}
            />
        );
    }
}

LoginContainer.prototypes = {
    login: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

LoginContainer.defaultProps = {
    isLoading: false
};

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
});
  
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: action.login,
      googleLogin: action.googleLogin
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);