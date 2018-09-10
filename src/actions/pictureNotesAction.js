import firebase, { storage } from "../config/Fire";
import * as actionTypes from "../constants/actionTypes";
import { convertObjToArr } from "../reducers/helper";

export const uploadImage = (image, close) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const imgName = image.name.split(".").shift();
  const extension = image.name.split(".").pop();
  const uidPart = `_${new Date().getTime()}_${uid}`;
  const newImage = `${imgName}${uidPart}.${extension}`;
  const uploadTask = storage.ref(`images/${newImage}`).put(image);
  uploadTask.on(
    "state_changed",
    snapshot => {
      // progress func
      console.log(snapshot);
      dispatch({
        type: actionTypes.SHOW_LOADER,
        payload: true
      });
    },  
    error => {
      console.log(error);
    },
    () => {
      // completed
      setTimeout(() => {
        dispatch({
          type: actionTypes.SHOW_LOADER,
          payload: false
        });
        close();
      }, 4000);
    }
  );
};

// fetch picture notes from firebase
export const getPictureNotes = isAuthUser => dispatch => {
  if (isAuthUser) {
    const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}/image`)
      .on("value", snapshot => {
        const pictureNote = snapshot.val() || {};
        const pictureNoteArray = convertObjToArr(pictureNote);
        let pictureNotes = [];
        pictureNotes = pictureNoteArray.map(val => {
          console.log("Picture Notes", val);
          return val;
        });
        dispatch({
          type: actionTypes.GET_PICTURENOTES,
          payload: pictureNotes
        });
      });
  }
};
