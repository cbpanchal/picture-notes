import firebase, { googleAuthProvider } from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export const setUser = () => dispatch =>
  firebase.auth().onAuthStateChanged(authUser => {
    if (!authUser) {
      dispatch({
        type: actionTypes.SET_USER,
        payload: null
      });
    } else {
      dispatch({
        type: actionTypes.SET_USER,
        payload: authUser
      });
    }
  });

export const login = credentials => async dispatch => {
  dispatch({
    type: actionTypes.SHOW_LOADER
  });
  await firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(auth => {
      dispatch({
        type: actionTypes.LOGIN,
        payload: auth.user
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Login failed",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.LOGIN
  });
};

export const signup = formData => async dispatch => {
  dispatch({
    type: actionTypes.SHOW_LOADER
  });
  await firebase
    .auth()
    .createUserWithEmailAndPassword(formData.email, formData.password)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Registration failed",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.SIGNUP
  });
};

export function logout() {
  firebase.auth().signOut();
  return {
    type: actionTypes.LOGOUT
  };
}

export const googleLogin = () => async dispatch => {
  dispatch({
    type: actionTypes.SHOW_LOADER
  });
  await firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Login failed",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.GOOGLE_LOGIN
  });
};
