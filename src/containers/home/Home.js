import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddButton from '../../components/addpicture/AddButton';
import { withStyles, Typography, Modal} from '@material-ui/core';
import styled from 'styled-components';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Home extends PureComponent {

  state = {
    open: false
  }

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
           <AddButton handleOpen={this.handleOpen}/>
        </div>
         <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
         <ModalWrapper>
           <div className={classes.paper}>
            <Typography variant="title" id="modal-title">
                Text in a modal
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <SimpleModalWrapped />
           </div>   
          </ModalWrapper>
        </Modal>
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

Home.defaultProps = {
  isLoading: false
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const SimpleModalWrapped = withStyles(styles)(Home);

const ModalWrapper = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  padding:15px;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
`;

export default connect(mapStateToProps)(SimpleModalWrapped);
