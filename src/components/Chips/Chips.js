import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    fontSize: 10
  }
});

const Chips = props => {
  const { classes, tags } = props;
  return (
    <div>
      {tags &&
        tags.map((tag, i) => {
          if (i === 3) {
            return false;
          }
          return (
            <Chip key={tag.label} label={tag.label} className={classes.chip} />
          );
        })}
    </div>
  );
};

Chips.propTypes = {
  classes: PropTypes.instanceOf(Object),
  tags: PropTypes.instanceOf(Array)
};

Chips.defaultProps = {
  classes: {},
  tags: []
};

export default withStyles(styles)(Chips);
