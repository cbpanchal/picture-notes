import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Modal, Typography } from '@material-ui/core';
import PictureNotesDropZone from '../../containers/picturenotes/PictureNotesContainer';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      margin:'auto'
    };
}

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
                    style={{alignItems:'center',justifyContent:'center',  outline: 'none'}}
                    >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Upload Image   
                        </Typography>
                        <PictureNotesDropZone close= {close} />
                        <SimpleModalWrapped />
                    </div>
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
