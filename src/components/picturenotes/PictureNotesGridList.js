import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { PictureNotesWrapper } from "../../style/PictureNotesStyle";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

const PictureNotesGridList = props => {
  const { classes, pictureNotes } = props;
  return (
    <PictureNotesWrapper>
      <div className={classes.root}>
        <GridList cellHeight={300} cols={3} className={classes.gridList}>
          {pictureNotes.map(picturenote => (
            <GridListTile key={picturenote.id}>
              <img src={picturenote.thumbnailUrl} alt={picturenote.name} />
              <GridListTileBar
                title="title"
                subtitle={<span>by: "subtitle"</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </PictureNotesWrapper>
  );
};

PictureNotesGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  pictureNotes: PropTypes.array
};

export default withStyles(styles)(PictureNotesGridList);
