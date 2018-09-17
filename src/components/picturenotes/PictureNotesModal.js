import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles, Modal, Typography } from "@material-ui/core";
import PictureNotesDropZone from "../../containers/picturenotes/PictureNotesContainer";
import { PictureNotesCardWrapper } from '../../style/PictureNotesStyle';

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class PictureNotesModal extends PureComponent {
  render() {
    const { classes, open, close } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
          style={{
            alignItems: "center",
            justifyContent: "center",
            outline: "none"
          }}
        >
          <PictureNotesCardWrapper className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Picture note
            </Typography>
            <PictureNotesDropZone close={close} />
            <SimpleModalWrapped />
          </PictureNotesCardWrapper>
        </Modal>
      </div>
    );
  }
}

PictureNotesModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool
};

PictureNotesModal.defaultProps = {
  open: false
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(PictureNotesModal);

export default SimpleModalWrapped;
