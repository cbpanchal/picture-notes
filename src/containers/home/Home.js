import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddButton from '../../components/picturenotes/AddButton';
import PictureNotesModal from '../../components/picturenotes/PictureNotesModal';

import Loader from "../loader/Loader";

class Home extends PureComponent {

constructor(props) {
  super(props);
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
}

state = {
  open: false,
};

handleOpen = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false });
};

render() {
  const { isLoading } = this.props;
  return (
    <div>
      <Loader isLoading={isLoading} />
      <AddButton handleOpen = {this.handleOpen}/>
      <PictureNotesModal 
        open= {this.state.open} 
        close= {this.handleClose}
      />
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
