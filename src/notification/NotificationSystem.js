import React, { Component } from "react";
import NotificationSystem from "react-notification-system";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Notification extends Component {
  componentWillReceiveProps(nextProps) {
    const { notification } = nextProps;
    this.notificationSystem.addNotification(notification);
  }

  render() {
    return (
      <NotificationSystem
        ref={n => {
          this.notificationSystem = n;
        }}
      />
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.instanceOf(Object)
};

Notification.defaultProps = {
  notification: {}
};

const mapStateToProps = state => ({
  notification: state.notification.notification
});

export default connect(mapStateToProps)(Notification);
