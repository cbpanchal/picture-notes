import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import PictureNotesCard from "../../components/picturenotes/PictureNotesCard";
import PictureNotesEditCard from "../../components/picturenotes/PictureNotesEditCard";
import * as action from "../../actions/pictureNotesAction";

class PictureNotesListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pictureNote: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.removePictureNote = this.removePictureNote.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const { rearrangePictureNotes, pictureNotes } = this.props;
    pictureNotes.splice(
      destination.index,
      0,
      pictureNotes.splice(source.index, 1)[0]
    );
    rearrangePictureNotes(pictureNotes);
  }

  handleClick(pictureNote) {
    this.setState({
      open: true,
      pictureNote
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  removePictureNote(pictureNote) {
    const { removePictureNote } = this.props;
    removePictureNote(pictureNote);
  }

  render() {
    const { pictureNotes } = this.props;
    const { open, pictureNote } = this.state;
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <PictureNotesCard
            pictureNotes={pictureNotes}
            handleClick={this.handleClick}
            removePictureNote={this.removePictureNote}
          />
        </DragDropContext>
        <PictureNotesEditCard
          open={open}
          close={this.handleClose}
          pictureNote={pictureNote}
        />
      </div>
    );
  }
}

PictureNotesListContainer.propTypes = {
  pictureNotes: PropTypes.instanceOf(Array),
  rearrangePictureNotes: PropTypes.func,
  removePictureNote: PropTypes.func
};

PictureNotesListContainer.defaultProps = {
  pictureNotes: [],
  rearrangePictureNotes: () => {},
  removePictureNote: () => {}
};

const mapStateToProps = state => ({
  isAuthUser: state.user.isAuthUser,
  pictureNotes: state.pictureNote.pictureNotes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removePictureNote: action.removePictureNote,
      rearrangePictureNotes: action.rearrangePictureNotes
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureNotesListContainer);
