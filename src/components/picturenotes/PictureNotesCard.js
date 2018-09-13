import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions, 
  CardContent,
  CardMedia, 
  Button, 
  Typography,
}
  from '@material-ui/core';

import { PictureNotesWrapper } from "../../style/PictureNotesStyle";
import styled from "styled-components";
import PictureNotesEditCard from "./PictureNotesEditCard";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  fullWidth: {
    width: `100%`,
  }
};

const state = {
  open: false,
};

const handleClick  = () => {
  debugger
  state.open = true;
};

const PictureNotesCard = props => {
  const { classes, pictureNotes } = props;
  return (
    <PictureNotesWrapper>
      {pictureNotes.map((pictureNote, id) => 
      <Cardlist key={id}>
        {console.log(pictureNote.thumbnailUrl)}
        <Card className={classes.card}>
          <CardActionArea 
            className={classes.fullWidth}
          >
            <CardMedia
              className={classes.media}
              image={pictureNote.thumbnailUrl}
              title="Contemplative Reptile"
              onClick={handleClick}
            />
            <CardContent className="pull-left">
              <Typography gutterBottom variant="headline" component="h2" className="pull-left">
                {pictureNote.data && pictureNote.data.title !== "" && pictureNote.data !== undefined ? 
                  pictureNote.data.title
                  : 'Title'
                }
              </Typography>
              <Typography component="p">
                {pictureNote.data && pictureNote.data.note !== "" && pictureNote.data !== undefined ?
                  pictureNote.data.note
                  : 'Note'
                }
              </Typography>
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
      )}
      <PictureNotesEditCard open={state.open}/>
    </PictureNotesWrapper>
  );
};

PictureNotesCard.propTypes = {
  classes: PropTypes.object.isRequired,
  pictureNotes: PropTypes.array.isRequired
};

PictureNotesCard.defaultProps = {
  pictureNotes: [],
};

const Cardlist = styled.div`
  display: inline-flex;
  margin: 10px;
`;

export default withStyles(styles)(PictureNotesCard);
