import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PictureNotesCard from "../../components/picturenotes/PictureNotesCard";
import PictureNotesEditCard from "../../components/picturenotes/PictureNotesEditCard";

class PictureNotesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureNotes: [],
      open: false,
      pictureNote: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(pictureNote) {
    this.setState({
      open: true,
      pictureNote
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };  

  render() {
    const { pictureNotes } = this.props;
    const { open, pictureNote } = this.state;
    return (
      <div>
        <PictureNotesCard pictureNotes={pictureNotes} handleClick={this.handleClick} />
        <PictureNotesEditCard open={open} close={this.handleClose} pictureNote={pictureNote}/>
      </div>
    );
  }
}

PictureNotesListContainer.propTypes = {
  pictureNotes: PropTypes.array.isRequired,
};

PictureNotesListContainer.defaultProps = {
  pictureNotes: [],
};

const mapStateToProps = state => ({
  isAuthUser: state.user.isAuthUser,
  pictureNotes: state.pictureNote.pictureNotes
});

export default connect(
  mapStateToProps,
  null
)(PictureNotesListContainer);
