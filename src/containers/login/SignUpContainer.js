import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import SignUp from "../../components/login/SignUp";
import * as action from "../../actions/loginAction";

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleInput = this.handleInput.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signUp() {
        const { signup } = this.props;
        const { ...values } = this.state;
        const email = values.email;
        const password = values.password;
        signup({
            email,
            password
        });
    }

    render() {
        return (
            <SignUp handleInput={this.handleInput} signUp={this.signUp}/>
        );
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {
            signup: action.signup,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(SignUpContainer);