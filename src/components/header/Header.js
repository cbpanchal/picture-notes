import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from "@material-ui/core";

const HeaderClass = styled.header`
  width: 100%;
  height: 40px;
  float: left;
  position: fixed;
  color: white;
  z-index: 999;
  background-color: #6d1b7b;

  > div {
    width: 100%;
    float: left;
    text-align: center;
    padding: 4px;
    line-height: 32px;
    background-color: rgba(0, 0, 0, 0.15);
  }

  > div > * {
    width: auto;
    float: right;
    margin: 0 10px;
  }

  button:focus {
    outline: none;
  }

  button {
    padding: 0;
    min-height: auto;
    height: 32px;
    width: 32px;
    min-width: 32px;
    background-color: #d6dadc;
    border-radius: 25em;
    color: #444;
    float: left;
    font-size: 12px;
    font-weight: 700;
  }

  button:hover {
    background-color: #cdd2d4;
  }

  > div > a {
    float: none;
    font-size: 20px;
    color: white;
    text-decoration: none;
  }
`;

const Header = props => {
  const {
    name,
    isAuthUser,
    open,
    buttonRef,
    handleToggle,
    handleClose,
    anchorEl,
    logout
  } = props;

  const menuTitle = name
    ? name
        .match(/\b(\w)/g)
        .join("")
        .substring(0, 2)
    : "";

  return (
    <HeaderClass hidden={!isAuthUser}>
      <div>
        <Link to="/">Picture Notes </Link>
        <div>
          <Button
            buttonRef={buttonRef}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {menuTitle}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorEl}
            transition
            disablePortal
            placement="bottom-end"
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} id="menu-list-grow">
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleClose}>{name} </MenuItem>
                      <MenuItem onClick={logout}>Logout </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </HeaderClass>
  );
};

Header.propTypes = {
  name: PropTypes.string,
  isAuthUser: PropTypes.bool,
  open: PropTypes.bool,
  buttonRef: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Object)
};

Header.defaultProps = {
  name: "",
  isAuthUser: false,
  open: false,
  anchorEl: {}
};

export default Header;
