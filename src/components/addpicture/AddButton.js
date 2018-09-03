import React, { PureComponent } from "react";
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
  
class AddButton extends PureComponent {

    constructor(props) {
        super(props);
    }

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

  const AddButtonWrapper = styled.div`
    position: absolute;
    display: inline-flex;
    bottom: 25px;
    float: right;
    text-align: right;
    right: 25px;
`;

export default AddButton;