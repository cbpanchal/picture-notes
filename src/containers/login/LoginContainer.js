import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Login from "../../components/login/Login";
import * as action from "../../actions/loginAction";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: ""
        };
        this.handelInput = this.handelInput.bind(this); 
        this.login = this.login.bind(this); 
    }

    handelInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login() {
        const { login } = this.props;
        const { ...values } = this.state;
        const email = values.email;
        const password = values.password;
        login ({
            email,
            password
        });
    }       

    render() {
        return (
            <Login handelInput={this.handelInput} login={this.login} />
        );
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: action.login,
    },
    dispatch
  );


export default connect(null, mapDispatchToProps)(LoginContainer);