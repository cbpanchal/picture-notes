import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as loginAction from "../actions/loginAction";
import * as pictureNoteAction from "../actions/pictureNotesAction";
import * as tagAction from "../actions/tagAction";

export default function isAuthenticated(WrappedComponent) {
  class authentication extends Component {
    componentWillMount() {
      const { setUser } = this.props;
      setUser();
    }

    componentWillReceiveProps(nextProps) {
      const { history, fetchPictureNotes, setTagsList } = this.props;
      fetchPictureNotes(nextProps.isAuthUser);
      setTagsList(nextProps.isAuthUser);
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
        setUser: loginAction.setUser,
        fetchPictureNotes: pictureNoteAction.getPictureNotes,
        setTagsList: tagAction.setTagsList
      },
      dispatch
    );

  authentication.propTypes = {
    setUser: PropTypes.func.isRequired,
    isAuthUser: PropTypes.bool,
    fetchPictureNotes: PropTypes.func.isRequired,
    setTagsList: PropTypes.func.isRequired,
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
