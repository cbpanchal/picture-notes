import React, { PureComponent } from "react";
import "../../style/PictureNotesStyle.css";
import { Typography, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import PropTypes from "prop-types";
import Overdrive from "react-overdrive";

const styles = () => ({
  button: {
    margin: 0
  }
});

class StackCard extends PureComponent {
  render() {
    const { cardStack, handleClick, classes, removePictureNote } = this.props;
    return (
      <div className="stack-container">
        <ul className="stack">
          {cardStack.map(card => (
            <li key={card.id} className="stack-item">
              <Overdrive id={card.id || "null"}>
                <img
                  src={card.thumbnailUrl}
                  alt={card.title || ""}
                  onClick={() => handleClick(cardStack)}
                  role="presentation"
                />
              </Overdrive>
              <div className="stack-card-note">
                <Typography
                  gutterBottom
                  variant="headline"
                  component="h4"
                  className="pull-left"
                  align="left"
                >
                  {card.title || "Title"}
                </Typography>
                <Typography component="p" align="left">
                  {card.note || "Notes"}
                </Typography>
                <div className="pull-right">
                  <IconButton
                    aria-label="Delete"
                    className={`${classes.button} pull-right`}
                  >
                    <Tooltip title="Delete note">
                      <DeleteIcon
                        style={{ fontSize: "18px" }}
                        onClick={() => removePictureNote(card)}
                      />
                    </Tooltip>
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

StackCard.propTypes = {
  classes: PropTypes.instanceOf(Object),
  cardStack: PropTypes.instanceOf(Array),
  handleClick: PropTypes.func,
  removePictureNote: PropTypes.func
};

StackCard.defaultProps = {
  classes: {},
  cardStack: [],
  handleClick: () => {},
  removePictureNote: () => {}
};

export default withStyles(styles)(StackCard);
