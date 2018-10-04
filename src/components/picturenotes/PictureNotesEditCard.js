import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Overdrive from "react-overdrive";
import {
  withStyles,
  Modal,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Input,
  TextField,
  Button
} from "@material-ui/core";
import CreatableSelect from "./CreatableSelect";

import * as action from "../../actions/pictureNotesAction";
import * as tagAction from "../../actions/tagAction";

import {
  PictureNotesCardWrapper,
  PictureNotesEditCardWrapper
} from "../../style/PictureNotesStyle";

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0
  },
  card: {
    maxWidth: 350,
    borderRadius: 0,
    overflow: "visible"
  },
  media: {
    height: 350,
    width: 350
  },
  fullWidth: {
    width: "100%"
  },
  input: {
    margin: theme.spacing.unit,
    width: 288
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 288
  }
});

class PictureNotesEditCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {},
      multipleInputs: [],
      isNoteUpdated: false,
      isPictureNotesEdit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    this.updatePictureNote = this.updatePictureNote.bind(this);
    this.updateMultiplePictureNote = this.updateMultiplePictureNote.bind(this);
    this.closeNote = this.closeNote.bind(this);
    this.handleSelectEditValues = this.handleSelectEditValues.bind(this);
  }

  handleChange(event) {
    let { inputs } = this.state;
    if (inputs !== undefined) {
      inputs = {
        ...inputs,
        [event.target.name]: [event.target.value]
      };
    } else if (inputs === undefined) {
      inputs = {
        [event.target.name]: [event.target.value]
      };
    }
    this.setState({ inputs, isNoteUpdated: true });
  }

  handleChangeMultiple(event, i) {
    const { multipleInputs } = this.state;
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const name = inputName.split("_").shift();
    const categoryId = inputName.split("_").pop();
    const array = inputName.split("_");
    const id = array[2];
    if (multipleInputs[i] !== undefined) {
      multipleInputs[i] = {
        ...multipleInputs[i],
        [name]: [inputValue],
        id: [id],
        categoryId: [categoryId]
      };
    } else if (multipleInputs[i] === undefined) {
      multipleInputs[i] = {
        [name]: [inputValue],
        id: [id],
        categoryId: [categoryId]
      };
    }
    this.setState({
      multipleInputs: Object.values(multipleInputs),
      isNoteUpdated: true
    });
  }

  handleSelectEditValues(value, actionMeta, index, id, categoryId) {
    const { tags, addTagsToUser } = this.props;
    if (actionMeta.action === "create-option") {
      const filteredTags = value.filter(tag => tag.__isNew__); // eslint-disable-line no-underscore-dangle
      filteredTags.map(tag => delete tag.__isNew__); // eslint-disable-line no-underscore-dangle
      addTagsToUser([...tags, ...filteredTags]);
    }
    this.setState(preState => ({
      ...preState,
      inputs: {
        ...preState.inputs,
        tags: value
      },
      isNoteUpdated: true
    }));
    if (id && categoryId) {
      this.setState(preState => ({
        ...preState,
        multipleInputs: {
          ...preState.multipleInputs,
          [index]: {
            ...preState.multipleInputs[index],
            tags: value,
            id,
            categoryId
          }
        }
      }));
    }
  }

  updatePictureNote(note) {
    const { updatePictureNote } = this.props;
    const { inputs } = this.state;
    if (inputs) {
      updatePictureNote(note, inputs);
    }
    this.closeNote();
  }

  updateMultiplePictureNote() {
    const { updatePictureNote } = this.props;
    const { multipleInputs } = this.state;
    if (multipleInputs) {
      Object.values(multipleInputs).map(input => {
        const { id, categoryId } = input;
        delete input.id;
        delete input.categoryId;
        const note = {
          id,
          categoryId
        };
        updatePictureNote(note, input);
        return false;
      });
      this.closeNote();
    }
  }

  closeNote() {
    const { close } = this.props;
    this.setState({
      isNoteUpdated: false,
      inputs: {},
      multipleInputs: {}
    });
    close();
  }

  render() {
    const { classes, open, pictureNote } = this.props;
    const { isNoteUpdated, isPictureNotesEdit } = this.state;
    let picTitle;
    let picNote;
    let picId;
    let image = "";
    let picTags;
    if (pictureNote.length === 1) {
      image = pictureNote[0].originalUrl;
      picId = pictureNote[0].id;
      picTitle = pictureNote[0].title;
      picNote = pictureNote[0].note;
      picTags = pictureNote[0].tags;
    }
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={() => this.closeNote()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            outline: "none"
          }}
        >
          {pictureNote.length <= 1 ? (
            <PictureNotesCardWrapper className={classes.paper}>
              <Card className={classes.card}>
                <CardActionArea
                  className={classes.fullWidth}
                  disableTouchRipple
                  disableRipple
                >
                  <Overdrive id={picId || "null"}>
                    <CardMedia
                      className={classes.media}
                      image={image || "null"}
                      title=""
                    />
                  </Overdrive>
                  <CardContent className="pull-left">
                    <Input
                      name="title"
                      placeholder="Title"
                      className={classes.input}
                      inputProps={{
                        "aria-label": "Title",
                        defaultValue: picTitle
                      }}
                      onChange={this.handleChange}
                    />
                    <TextField
                      name="note"
                      placeholder="Note"
                      multiline
                      rowsMax="4"
                      className={classes.textField}
                      margin="normal"
                      inputProps={{
                        "aria-label": "Note",
                        defaultValue: picNote
                      }}
                      onChange={this.handleChange}
                    />
                    <CreatableSelect
                      isTagEdit
                      editTags={picTags}
                      handleSelectEditValues={this.handleSelectEditValues}
                    />
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.closeNote()}
                  >
                    close
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    disabled={!isNoteUpdated}
                    onClick={() => this.updatePictureNote(pictureNote[0])}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </PictureNotesCardWrapper>
          ) : (
            <PictureNotesEditCardWrapper
              className={`${classes.paper} ${
                isPictureNotesEdit ? "picture-notes-edit-container" : ""
              }`}
            >
              {pictureNote.map((note, i) => {
                if (pictureNote.length > 3) {
                  this.setState({
                    isPictureNotesEdit: true
                  });
                } else {
                  this.setState({
                    isPictureNotesEdit: false
                  });
                }
                return (
                  <Card key={note.id} className={classes.card}>
                    <CardActionArea
                      className={classes.fullWidth}
                      disableTouchRipple
                      disableRipple
                    >
                      <Overdrive id={note.id || "null"}>
                        <CardMedia
                          className={classes.media}
                          image={note.originalUrl || "null"}
                          title=""
                        />
                      </Overdrive>
                      <CardContent className="pull-left">
                        <Input
                          name={`title_${i}_${note.id}_${note.categoryId}`}
                          placeholder="Title"
                          className={classes.input}
                          inputProps={{
                            "aria-label": "Title",
                            defaultValue: note.title
                          }}
                          onChange={e => this.handleChangeMultiple(e, i)}
                        />
                        <TextField
                          name={`note_${i}_${note.id}_${note.categoryId}`}
                          placeholder="Note"
                          multiline
                          rowsMax="4"
                          className={classes.textField}
                          margin="normal"
                          inputProps={{
                            "aria-label": "Note",
                            defaultValue: note.note
                          }}
                          onChange={e => this.handleChangeMultiple(e, i)}
                        />
                        <CreatableSelect
                          isTagEdit
                          editTags={note.tags}
                          indexData={i}
                          id={note.id}
                          categoryId={note.categoryId}
                          handleSelectEditValues={this.handleSelectEditValues}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
              <div
                className={
                  !isPictureNotesEdit
                    ? "update-btn-container"
                    : "update-btn-container-1"
                }
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.closeNote()}
                >
                  close
                </Button>
                <Button
                  size="small"
                  color="primary"
                  disabled={!isNoteUpdated}
                  onClick={() => this.updateMultiplePictureNote()}
                >
                  Update
                </Button>
              </div>
            </PictureNotesEditCardWrapper>
          )}
        </Modal>
      </div>
    );
  }
}

PictureNotesEditCard.propTypes = {
  classes: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  pictureNote: PropTypes.instanceOf(Array),
  tags: PropTypes.instanceOf(Array),
  updatePictureNote: PropTypes.func,
  addTagsToUser: PropTypes.func,
  close: PropTypes.func
};

PictureNotesEditCard.defaultProps = {
  classes: {},
  open: false,
  pictureNote: [],
  tags: [],
  updatePictureNote: () => {},
  addTagsToUser: () => {},
  close: () => {}
};

const mapStateToProps = state => ({
  tags: state.tags.tagList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePictureNote: action.updatePictureNote,
      addTagsToUser: tagAction.addTagsToUser
    },
    dispatch
  );
// We need an intermediary variable for handling the recursive nesting.

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PictureNotesEditCard));
