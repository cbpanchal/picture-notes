import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Button } from "@material-ui/core";
import Loader from "../loader/Loader";
import * as action from "../../actions/pictureNotesAction";

class PictureNotesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesToBeSent: [],
      filesPreview: [],
      printcount: 10,
      imageSelected: true,
      image: null,
      imageUrl: ""
    };
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    console.log(acceptedFiles[0]);
    const filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      const filesPreview = [];
      for (const i in filesToBeSent) {
        filesPreview.push(
          <div key={i}>
            <ImageWrapper
              src={filesToBeSent[i][0].preview}
              alt="image preview"
            />
            {filesToBeSent[i][0].name}
          </div>
        );
      }
      this.setState({
        filesToBeSent,
        filesPreview,
        imageSelected: false,
        image: acceptedFiles[0]
      });
    } else {
      alert("You have reached the limit of printing files at a time");
    }
  }

  uploadHandler() {
    const { image } = this.state;
    const { uploadHandler, close } = this.props;

    uploadHandler(image, close);
    // close();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Loader loading={isLoading} />
        <PictureNotesWrapper>
          <Dropzone
            className="dropzone"
            onDrop={files => this.onDrop(files)}
            accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
            multiple={false}
            disableClick={false}
          >
            <div>
              Try dropping some files here, or click to select files to upload.
            </div>
          </Dropzone>
          <div>
            Image:
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
              Upload
            </Button>
          </div>
        </PictureNotesWrapper>
      </div>
    );
  }
}

PictureNotesContainer.propTypes = {
  uploadHandler: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.pictureNote.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      uploadHandler: action.uploadImage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureNotesContainer);

const PictureNotesWrapper = styled.div`
  padding-top: 25px;
`;

const ImageWrapper = styled.img`
  width: 400px;
  height: 400px;
`;
