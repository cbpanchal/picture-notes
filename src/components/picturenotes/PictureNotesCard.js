import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Overdrive from "react-overdrive";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../../style/PictureNotesStyle.css";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import Chips from "../Chips/Chips";

import {
  PictureNotesWrapper,
  TitleNoteWrapper
} from "../../style/PictureNotesStyle";
import StackCard from "./StackCard";

const styles = () => ({
  card: {
    width: 225,
    borderRadius: 2
  },
  media: {
    height: 140
  },
  fullWidth: {
    width: "100%"
  },
  button: {
    margin: 0
  },
  justifyContent: {
    justifyContent: "space-between",
    float: "right"
  }
});

const PictureNotesCard = props => {
  const { classes, pictureNotes, handleClick, removePictureNote } = props;
  const customNotes = Object.values(pictureNotes);
  return (
    <PictureNotesWrapper>
      {customNotes.map((notes, index) => {
        const pictureNote = Object.values(notes);
        if (pictureNote.length <= 1) {
          const { title, note, id, thumbnailUrl, tags } = pictureNote[0];
          return (
            <Droppable
              key={index}
              droppableId="pictureNote"
              direction="horizontal"
            >
              {dropProvided => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  <CardWrapper key={id}>
                    <Draggable draggableId={String(id)} index={id}>
                      {dragprovided => (
                        <div
                          {...dragprovided.draggableProps}
                          {...dragprovided.dragHandleProps}
                          ref={dragprovided.innerRef}
                        >
                          <Card className={classes.card}>
                            <CardActionArea className={classes.fullWidth}>
                              <Overdrive id={id || "null"}>
                                <CardMedia
                                  className={classes.media}
                                  image={thumbnailUrl || ""}
                                  title="image"
                                  onClick={() => handleClick(pictureNote)}
                                />
                              </Overdrive>
                              <CardContent className="pull-left">
                                <TitleNoteWrapper>
                                  <Typography
                                    gutterBottom
                                    variant="headline"
                                    component="h4"
                                    className="pull-left"
                                    align="left"
                                  >
                                    {title || "Title"}
                                  </Typography>
                                  <Typography component="p" align="left">
                                    {note || "Note"}
                                  </Typography>
                                </TitleNoteWrapper>
                              </CardContent>
                            </CardActionArea>
                            <div className="chips-container">
                              <Chips tags={tags} />
                            </div>
                            <CardActions className={classes.justifyContent}>
                              <div className="pull-right">
                                <IconButton
                                  aria-label="Delete"
                                  className={classes.button}
                                >
                                  <Tooltip title="Delete note">
                                    <DeleteIcon
                                      style={{ fontSize: "18px" }}
                                      onClick={() =>
                                        removePictureNote(pictureNote[0])
                                      }
                                    />
                                  </Tooltip>
                                </IconButton>
                              </div>
                            </CardActions>
                          </Card>
                          {dropProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  </CardWrapper>
                </div>
              )}
            </Droppable>
          );
        }
        const cardStack = [];
        return (
          <CardWrapper key={index}>
            {pictureNote.map(card => {
              cardStack.push(card);
              return false;
            })}
            <StackCard
              cardStack={cardStack}
              handleClick={handleClick}
              removePictureNote={removePictureNote}
            />
          </CardWrapper>
        );
      })}
    </PictureNotesWrapper>
  );
};

PictureNotesCard.propTypes = {
  classes: PropTypes.instanceOf(Object),
  pictureNotes: PropTypes.instanceOf(Array),
  handleClick: PropTypes.func,
  removePictureNote: PropTypes.func
};

PictureNotesCard.defaultProps = {
  pictureNotes: [],
  classes: {},
  handleClick: () => {},
  removePictureNote: () => {}
};

const CardWrapper = styled.div`
  margin: 10px 10px 50px 10px;
  display: flex;
  float: left;
`;

export default withStyles(styles)(PictureNotesCard);
