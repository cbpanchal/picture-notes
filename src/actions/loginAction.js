import firebase from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export const setUser = () => dispatch =>
  new Promise(resolve => {
    firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          payload: null
        });
        resolve(authUser);
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          payload: authUser
        });
        resolve(authUser);
      }
    });
});

export const login = credentials => dispatch => {
    firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(auth => {
            dispatch({
                type: actionTypes.LOGIN,
                payload: auth.user
            });
        })
        dispatch({
            type: actionTypes.LOGIN
        });
};

export const signup = formData => dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then( res => {
          debugger;
      })
      .catch(error => {
        dispatch({
          type: '',
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