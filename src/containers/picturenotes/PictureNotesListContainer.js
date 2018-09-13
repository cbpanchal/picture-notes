import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PictureNotesCard from "../../components/picturenotes/PictureNotesCard";

class PictureNotesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureNotes: []
    };
  }
  
  render() {
    const { pictureNotes } = this.props;
    return (
      <div>
        <PictureNotesCard pictureNotes={pictureNotes} />
      </div>
    );
  }
}

PictureNotesListContainer.propTypes = {
  pictureNotes: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthUser: state.user.isAuthUser,
  pictureNotes: state.pictureNote.pictureNotes
});

export default connect(
  mapStateToProps,
  null
)(PictureNotesListContainer);
