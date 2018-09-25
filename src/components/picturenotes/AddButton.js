import React, { PureComponent } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import PropTypes from "prop-types";

class AddButton extends PureComponent {
  render() {
    const { handleOpen } = this.props;
    return (
      <div>
        <AddButtonWrapper>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={handleOpen}
          >
            <AddIcon />
          </Button>
        </AddButtonWrapper>
      </div>
    );
  }
}

AddButton.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

const AddButtonWrapper = styled.div`
  position: fixed;
  display: inline-flex;
  bottom: 25px;
  float: right;
  text-align: right;
  right: 25px;
  z-index: 999;
`;

export default AddButton;
