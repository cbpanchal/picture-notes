import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Loader from "../loader/Loader";

class Home extends PureComponent {
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Loader isLoading={isLoading} />
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool
};

Home.defaultProps = {
  isLoading: false
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(Home);
