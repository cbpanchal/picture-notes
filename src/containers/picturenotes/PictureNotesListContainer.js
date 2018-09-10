import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PictureNotesGridList from "../../components/picturenotes/PictureNotesGridList";

class PictureNotesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureNotes: []
    };
  }

  componentDidMount() {
  }

  render() {
    const { pictureNotes } = this.props;
    return (
      <div>
        <PictureNotesGridList pictureNotes={pictureNotes} />
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
