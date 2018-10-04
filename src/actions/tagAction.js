import firebase from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export const setTagsList = isAuthUser => dispatch => {
  if (isAuthUser) {
    const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}/tags`)
      .on("value", snapshot => {
        const tags = snapshot.val() || {};
        dispatch({
          type: actionTypes.SET_TAG_LIST,
          payload: tags
        });
      });
  } else {
    dispatch({
      type: actionTypes.SET_TAG_LIST,
      payload: []
    });
  }
};

export function addTagsToUser(tags) {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/tags`)
    .update([...tags]);
  return {
    type: actionTypes.ADD_TAGS_TO_USER
  };
}
