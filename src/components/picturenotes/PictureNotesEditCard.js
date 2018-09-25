import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Overdrive from 'react-overdrive';
import * as action from "../../actions/pictureNotesAction";
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
  Button,
} from "@material-ui/core";
import { PictureNotesCardWrapper } from '../../style/PictureNotesStyle';

const styles = theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0,
  },
  card: {
    maxWidth: 350,
    borderRadius: 0
  },
  media: {
    height: 350,
    width: 350,
  },
  fullWidth: {
    width: "100%"
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class PictureNotesEditCard extends PureComponent {
  constructor(props) {
    super(props);
      this.state = {
        inputs: {},
        isNoteUpdated: false,
      };
    this.handleChange = this.handleChange.bind(this);
    this.updatePictureNote = this.updatePictureNote.bind(this);
    this.closeNote = this.closeNote.bind(this);
  }

  handleChange(event) {
    let { inputs } = this.state;
    if(inputs !== undefined) {
      inputs = {
        ...inputs,
        [event.target.name]:  [event.target.value],
      }
    } else if(inputs === undefined) {
      inputs = {
        [event.target.name]:  [event.target.value],
      }
    }
    this.setState({inputs, isNoteUpdated: true});
  }
  
  updatePictureNote(note) {
    const { updatePictureNote } = this.props;
    const data = this.state.inputs;
    if(data) {
      updatePictureNote(note, data);
    }
    this.closeNote();
  }

  closeNote() {
    const { close } = this.props;
    this.setState({
      isNoteUpdated: false,
      inputs: {}
    });
    close();
  }

  render() {
    const { classes, open, pictureNote } = this.props;
    const { isNoteUpdated } = this.state;
    let title, note, id, image = '';
    console.log('pictureNote', pictureNote[0]);
    if(pictureNote.length === 1) {
      image = pictureNote[0].originalUrl;
      id = pictureNote[0].id;
      title = pictureNote[0].title;
      note = pictureNote[0].note;
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
        {pictureNote.length <= 1 ? 
          (
          <PictureNotesCardWrapper className={classes.paper}>
            <Card className={classes.card}>
              <CardActionArea 
                className={classes.fullWidth}
                disableTouchRipple={true}
                disableRipple={true}
              >
                <Overdrive id={id || "null"}>
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
                      'aria-label': 'Title',
                      defaultValue: title
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
                      'aria-label': 'Note',
                      defaultValue: note
                    }}
                    onChange={this.handleChange}
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
                  onClick={() => this.updatePictureNote(id)}>
                  Update
                </Button>
              </CardActions>
            </Card>
          </PictureNotesCardWrapper>
          ) : 
          (
            <PictureNotesCardWrapper className={classes.paper}>
            {pictureNote.map(note => {
              console.log(">>>>>>", note);
              <Card className={classes.card}>
                <CardActionArea 
                  className={classes.fullWidth}
                  disableTouchRipple={true}
                  disableRipple={true}
                >
                  <Overdrive id={id || "null"}>
                    <CardMedia
                      className={classes.media}
                      image={note.originalUrl || "null"}
                      title=""
                    />
                  </Overdrive>
                  <CardContent className="pull-left">
                    <Input
                      name="title"
                      placeholder="Title"
                      className={classes.input}
                      inputProps={{
                        'aria-label': 'Title',
                        defaultValue: note.title
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
                        'aria-label': 'Note',
                        defaultValue: note.note
                      }}
                      onChange={this.handleChange}
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
                    onClick={() => this.updatePictureNote(note)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            })
          }
          </PictureNotesCardWrapper>
          )
        }
        </Modal>
      </div>
    );
  }
}

PictureNotesEditCard.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  pictureNote: PropTypes.array.isRequired,
};

PictureNotesEditCard.defaultProps = {
  open: false,
  pictureNote: [],
  id: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePictureNote: action.updatePictureNote,
    },
    dispatch
  );
// We need an intermediary variable for handling the recursive nesting.

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PictureNotesEditCard));

