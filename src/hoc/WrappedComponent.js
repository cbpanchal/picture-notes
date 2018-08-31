import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as loginAction from "../actions/loginAction";

export default function isAuthenticated(WrappedComponent) {
  class authentication extends Component {
    componentWillMount() {
      const { setUser } = this.props;
      setUser();
    }

    componentWillReceiveProps(nextProps) {
      const { history } = this.props;
      if (
        nextProps.isAuthUser &&
        (history.location.pathname === "/login" ||
          history.location.pathname === "/signup")
      ) {
        history.push("/");
      }

      if (!nextProps.isAuthUser && history.location.pathname === "/") {
        history.push("/login");
      }
    }

    render() {
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = state => ({
    isAuthUser: state.user.isAuthUser,
    user: state.user.user
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        setUser: loginAction.setUser
      },
      dispatch
    );

  authentication.propTypes = {
    setUser: PropTypes.func.isRequired,
    isAuthUser: PropTypes.bool,
    history: PropTypes.instanceOf(Object)
  };

  authentication.defaultProps = {
    isAuthUser: false,
    history: {}
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(authentication);
}
