import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Button, Input, withStyles, TextField } from "@material-ui/core";
import CreatableSelect from "../../components/picturenotes/CreatableSelect";
import Loader from "../loader/Loader";
import * as action from "../../actions/pictureNotesAction";
import "../../style/PictureNotesStyle.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class PictureNotesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesToBeSent: [],
      filesPreview: [],
      imageSelected: true,
      inputs: [],
      values: [],
      isClassAdded: false
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelectValues = this.handleSelectValues.bind(this);
  }

  onDrop(acceptedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    if (!acceptedFiles.length) {
      return null;
    }
    const { filesToBeSent } = this.state;
    acceptedFiles.map(file => {
      filesToBeSent.push(file);
      return false;
    });
    if (filesToBeSent.length > 3) {
      this.setState({
        isClassAdded: true
      });
    }
    this.setState({
      filesToBeSent,
      imageSelected: false,
      images: filesToBeSent
    });
    return false;
  }

  handleInput(event, i) {
    const { inputs } = this.state;
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const name = inputName.split("_").shift();
    if (inputs[i] !== undefined) {
      inputs[i] = {
        ...inputs[i],
        [name]: inputValue
      };
    } else if (inputs[i] === undefined) {
      inputs[i] = {
        [name]: inputValue
      };
    }
    this.setState({ inputs });
  }

  uploadHandler() {
    const { images, inputs, values } = this.state;
    const { uploadHandler, close } = this.props;
    uploadHandler(images, close, inputs, values)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSelectValues(values) {
    console.log(values);
    this.setState({ values });
  }

  render() {
    const { isLoading, close, classes } = this.props;
    const { isClassAdded, imageSelected, filesToBeSent } = this.state;
    console.log(this.state);
    return (
      <div>
        <Loader loading={isLoading} />
        <PictureNotesWrapper>
          <Dropzone
            className="Dropzone"
            onDrop={files => this.onDrop(files)}
            accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
            disableClick={false}
            multiple
          >
            <div className="Dropzone-upload-area">
              Try dropping some files here, or click to select files to upload.
            </div>
          </Dropzone>
          <div className={isClassAdded ? "ImageContainer" : ""}>
            {filesToBeSent.map((f, i) => (
              <div key={f.preview} className="Grid">
                <ImageWrapper
                  src={filesToBeSent[i].preview}
                  alt="image preview"
                />
                <Input
                  name={`title_${i}`}
                  placeholder="Title"
                  className={classes.input}
                  inputProps={{
                    "aria-label": "Title"
                  }}
                  onChange={e => this.handleInput(e, i)}
                />
                <TextField
                  placeholder="Take a note"
                  name={`note_${i}`}
                  multiline
                  rowsMax="4"
                  className={classes.textField}
                  margin="normal"
                  onChange={e => this.handleInput(e, i)}
                />
                <CreatableSelect
                  handleSelectValues={this.handleSelectValues}
                  index={i}
                />
              </div>
            ))}
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className="pull-right"
              disabled={imageSelected}
              onClick={this.uploadHandler}
            >
              Save Note
            </Button>
            <Button size="small" color="primary" onClick={close}>
              close
            </Button>
          </div>
        </PictureNotesWrapper>
      </div>
    );
  }
}

PictureNotesContainer.propTypes = {
  uploadHandler: PropTypes.func,
  close: PropTypes.func,
  classes: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool
};

PictureNotesContainer.defaultProps = {
  uploadHandler: () => {},
  close: () => {},
  classes: {},
  isLoading: false
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
  width: 250px;
  height: 250px;
`;
