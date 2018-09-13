import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Modal, Typography } from '@material-ui/core';

const styles = theme => ({
    paper: {
      position: 'absolute',
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
      margin:'auto',
      outline: 'none'
    };
}

class PictureNotesEditCard extends PureComponent {
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

                        <SimpleModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

PictureNotesEditCard.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool
};

PictureNotesEditCard.defaultProps = {
    open: false
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(PictureNotesEditCard);

export default SimpleModalWrapped;
