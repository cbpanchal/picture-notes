import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Overdrive from 'react-overdrive';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../../style/PictureNotesStyle.css';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import DeleteIcon  from '@material-ui/icons/Delete';

import styled from "styled-components";
import { PictureNotesWrapper, TitleNoteWrapper } from "../../style/PictureNotesStyle";
import StackCard from '../../components/picturenotes/StackCard';

const styles = theme => ({
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
    margin: 0,
  },
  justifyContent: {
    justifyContent: "space-between"
  }
});

const PictureNotesCard = props => {
  const { classes, pictureNotes, handleClick, removePictureNote } = props;
  const customNotes = Object.values(pictureNotes);
  return (
    <PictureNotesWrapper>
      {customNotes.map((pictureNotes, id) => {
        let notes = Object.values(pictureNotes);
        if(notes.length <= 1) {
          const thumb = notes[0][2];
          const key = notes[0][0];
          return (
            <Droppable 
              droppableId="pictureNote"
              direction="horizontal"
            >
              {dropProvided => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                <CardWrapper key={key}>
                  <Draggable draggableId={String(key)} index={id}>
                    {dragprovided => (
                      <div 
                        {...dragprovided.draggableProps}
                        {...dragprovided.dragHandleProps}
                        ref={dragprovided.innerRef}
                      >
                        <Card className={classes.card} >
                          <CardActionArea className={classes.fullWidth}>
                            <Overdrive id={id || "null"}>
                              <CardMedia
                                className={classes.media}
                                image={thumb || ""}
                                title="image"
                                onClick={() => handleClick}
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
                                  Title
                                </Typography>
                                <Typography 
                                  component="p"
                                  align="left"
                                >
                                  Note
                                </Typography>
                              </TitleNoteWrapper>
                            </CardContent>
                          </CardActionArea>
                          <CardActions className={classes.justifyContent}>
                            <div className="pull-left">
                              <Button size="small" color="primary">
                                Share
                              </Button>
                            </div>
                            <div className="pull-right">
                              <IconButton aria-label="Delete" className={classes.button}>
                                <Tooltip title="Delete note">
                                  <DeleteIcon style={{ fontSize: '18px' }} onClick={() => removePictureNote()}/>
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
          )
          } else {
            let cardStack = [];
            return(
              <CardWrapper>
                {notes.map((card, i) => {
                  cardStack.push(card[2]);
                })}
                <StackCard images={cardStack}/>
              </CardWrapper>
            )
          }
        })
      }
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  margin: 10px;
  display: flex;
  float: left;
`;

export default withStyles(styles)(PictureNotesCard);
