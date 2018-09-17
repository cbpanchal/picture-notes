import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Overdrive from 'react-overdrive';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";

import styled from "styled-components";
import { PictureNotesWrapper, TitleNoteWrapper } from "../../style/PictureNotesStyle";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  fullWidth: {
    width: "100%"
  }
};

const PictureNotesCard = props => {
  const { classes, pictureNotes, handleClick } = props;
  return (
    <PictureNotesWrapper>
      {pictureNotes.map((pictureNote, id) => (
        <Cardlist key={id}>
          <Card className={classes.card}>
            <CardActionArea className={classes.fullWidth}>
              <Overdrive id={pictureNote.id}>
                <CardMedia
                  className={classes.media}
                  image={pictureNote.thumbnailUrl || ""}
                  title={
                    pictureNote.data &&
                      pictureNote.data.title !== "" &&
                      pictureNote.data !== undefined
                        ? pictureNote.data.title
                        : ""
                  }
                  onClick={() => handleClick(pictureNote)}
                />
              </Overdrive>
              <CardContent className="pull-left">
                <TitleNoteWrapper>
                  <Typography
                    gutterBottom
                    variant="headline"
                    component="h2"
                    className="pull-left"
                  >
                    {pictureNote.data &&
                    pictureNote.data.title !== "" &&
                    pictureNote.data !== undefined
                      ? pictureNote.data.title
                      : "Title"}
                  </Typography>
                  <Typography component="p">
                    {pictureNote.data &&
                    pictureNote.data.note !== "" &&
                    pictureNote.data !== undefined
                      ? pictureNote.data.note
                      : "Note"}
                  </Typography>
                </TitleNoteWrapper>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Cardlist>
      ))}
    </PictureNotesWrapper>
  );
};

PictureNotesCard.propTypes = {
  classes: PropTypes.object.isRequired,
  pictureNotes: PropTypes.array.isRequired
};

PictureNotesCard.defaultProps = {
  pictureNotes: []
};

const Cardlist = styled.div`
  display: inline-flex;
  margin: 10px;
`;

export default withStyles(styles)(PictureNotesCard);
