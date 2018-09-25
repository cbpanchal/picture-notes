import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Button, Input, withStyles, TextField } from "@material-ui/core";
import Loader from "../loader/Loader";
import * as action from "../../actions/pictureNotesAction";
import "../../style/PictureNotesStyle.css";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

class PictureNotesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesToBeSent: [],
      filesPreview: [],
      imageSelected: true,
      image: [],
      imageUrl: "",
      inputs: [],
      isClassAdded: false
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const { classes } = this.props;
    // console.log('Accepted files: ', acceptedFiles[0].name);
    console.log(acceptedFiles);
    if (!acceptedFiles.length) {
      return null;
    } else {
      const filesToBeSent = this.state.filesToBeSent;
      acceptedFiles.map(file => {
        filesToBeSent.push(file);
      });
      if(filesToBeSent.length > 3) {
        this.setState({
          isClassAdded: true,
        })
      }
      const filesPreview = [];
      filesToBeSent.map((f,i) => 
          filesPreview.push(
            <div key={i} className="Grid">
                <ImageWrapper
                  src={filesToBeSent[i].preview}
                  alt="image preview"
                />
                <Input
                  name={`title_${i}`}
                  placeholder="Title"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Title',
                  }}
                  onChange={(e) => this.handleInput(e, i)}
                />
                <TextField
                  placeholder="Take a note"
                  name={`note_${i}`}
                  multiline
                  rowsMax="4"
                  className={classes.textField}
                  margin="normal"
                  onChange={(e) => this.handleInput(e, i)}
                />
            </div>
          ) 
      );  
      this.setState({
        filesToBeSent,
        filesPreview,
        imageSelected: false,
        images: filesToBeSent
      }); 
    }
  }

  handleInput(event, i) {
    const { inputs } = this.state;
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const name = inputName.split("_").shift();
    if (inputs[i] !== undefined){
      inputs[i] = {
        ...inputs[i],
        [name]: inputValue
      }
    } else if(inputs[i] === undefined){
      inputs[i] = {
        [name]: inputValue
      }
    }
    this.setState({inputs})
  }

  uploadHandler() {
    const { images } = this.state;
    const { uploadHandler, savePictureNote, close } = this.props;
    const inputArray = this.state.inputs;
    console.log(inputArray);
    uploadHandler(images, close, inputArray)
      .then(res => {
        console.log(res);
        // const saveData = res.map((id, index) => 
        //   [id, inputArray[index]]
        // );
        // console.log(saveData);
        // const saveNotePromises = saveData.map((note, i) => {
        //     savePictureNote(note);
        // });
        // Promise.all(saveNotePromises)
        //   .then(res => {
        //     console.log(res)
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { isLoading, close } = this.props;
    return (
      <div>
        <Loader loading={isLoading} />
        <PictureNotesWrapper>
          <Dropzone
            className="Dropzone"
            onDrop={files => this.onDrop(files)}
            accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
            disableClick={false}
            multiple={true}
          >
            <div className="Dropzone-upload-area">
              Try dropping some files here, or click to select files to upload.
            </div>
          </Dropzone>
          <div className={`${this.state.isClassAdded ? "ImageContainer" : ""}`}>
            {this.state.filesPreview}
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className="pull-right"
              disabled={this.state.imageSelected}
              onClick={this.uploadHandler}
            >
              Save Note
            </Button>
            <Button 
              size="small"
              color="primary"
              onClick={close}
            >
              close
            </Button>
          </div>
        </PictureNotesWrapper>
      </div>
    );
  }
}

PictureNotesContainer.propTypes = {
  uploadHandler: PropTypes.func.isRequired,
  savePictureNote: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
};

PictureNotesContainer.defaultProps = {
  title: "",
  note: "",
};

const mapStateToProps = state => ({
  isLoading: state.pictureNote.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      uploadHandler: action.uploadImage,
      savePictureNote: action.savePictureNote
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PictureNotesContainer));

const PictureNotesWrapper = styled.div`
  padding-top: 15px;
`;

const ImageWrapper = styled.img`
  width: 150px;
  height: 150px;
`;
