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
        let pictureNote = Object.values(pictureNotes);
        if(pictureNote.length <= 1) {
          const thumb = pictureNote[0].thumbnailUrl;
          const title = pictureNote[0].title;
          const note = pictureNote[0].note;
          const id = pictureNote[0].id;
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
                <CardWrapper key={id}>
                  <Draggable draggableId={String(id)} index={id}>
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
                                  {title || 'Title'}
                                </Typography>
                                <Typography 
                                  component="p"
                                  align="left"
                                >
                                  {note || 'Note'}
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
              <CardWrapper key={id}>
                {pictureNote.map((card, i) => {
                  cardStack.push(card);
                })}
                <StackCard cardStack={cardStack} handleClick = {handleClick}/>
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
