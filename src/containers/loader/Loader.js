import React from "react";
import PropTypes from "prop-types";
import { RingLoader } from "react-spinners";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 9999;

  > div {
    margin: auto;
  }
`;

const loaderColor = "#00d8ff";

class Loader extends React.PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <LoaderContainer hidden={!loading}>
        <RingLoader color={loaderColor} loading={loading} />
      </LoaderContainer>
    );
  }
}

Loader.defaultProps = {
  loading: false
};

Loader.propTypes = {
  loading: PropTypes.bool
};

export default Loader;
