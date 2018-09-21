import firebase, { storage } from "../config/Fire";
import * as actionTypes from "../constants/actionTypes";
import { convertObjToArr } from "../reducers/helper";

export const uploadImage = (images, close) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const newImages = {
    fileName: [],
    image: [],
    timeStampArray: []
  };
  let imgobj = null;
  let oldTimeStamp = null;
  images.map((image, index) => {
    imgobj = image;
    const imgName = image.name.split(".").shift();
    const extension = image.name.split(".").pop();
    oldTimeStamp = new Date().getTime();
    newImages.timeStampArray.push(oldTimeStamp);
    const uidPart = `_${oldTimeStamp}_${uid}`;
    newImages.fileName.push(`${imgName}${uidPart}.${extension}`);
    newImages.image.push(imgobj);
  });
  const imagesData = convertObjToArr(newImages);
  const [file, obj] = imagesData;
  const fileArray = Object.values(file);
  const objArray = Object.values(obj);
  const newArray = fileArray.map((name, index) => [name, objArray[index]]);
  const finalArray = newArray.slice(0, -1);
  return new Promise((resolve, reject) => {
    finalArray.map((file) => {
      const uploadTask = storage.ref(`images/${file[0]}`).put(file[1]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress func
          console.log(snapshot);
          // if((snapshot.bytesTransferred - snapshot.totalBytes) == 0) {}
          dispatch({
            type: actionTypes.SHOW_LOADER,
            payload: true
          });
        },
        error => {
          console.log(error);
          reject(error);
        },
        () => {
          // completed
          console.log(newImages.timeStampArray);
          setTimeout(() => {
            resolve(newImages.timeStampArray);
            dispatch({
              type: actionTypes.SHOW_LOADER,
              payload: false
            });
            close();
          }, 7000);
        }
      );
    });
  });
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
        let pictureNotes = {};
        // pictureNotes = pictureNoteArray.map(val => val)
        pictureNotes = pictureNoteArray.map(val => val.category.images);
        //.sort((a, b) => a.index - b.index || a.id - b.id);
        dispatch({
          type: actionTypes.GET_PICTURENOTES,
          payload: pictureNotes
        });
      });
  }
};

export const savePictureNote = notes => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const id = notes[0];
  let title;
  let note = null;
  if (notes[1] !== undefined) {
    title = notes[1].title;
    note = notes[1].note;
  }
  const image = {
    title: title || "",
    note: note || ""
  };
    firebase
      .database()
      .ref(`users/${uid}/image/${id}/category/images/data`)
      // .ref(`users`).child(uid).child("image").child(id).child("category")
      //   .child("images").once("value").then(snapshot => {
      //   if(snapshot.exists()) {
      //     firebase.database().ref(`users/${uid}/image/${id}/category/images/data`).update(image);
      //   } else {
      //     firebase.database().ref(`users/${uid}/image/${id}/category/images/data`).set(image);
      //   }
      // })
      .update(image)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
};

export const updatePictureNote = (id, pictureNote) => dispatch => {
  const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}/image/${id}/data`)
      .update(pictureNote);
};

export const removePictureNote = pictureNote => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/image/${pictureNote.id}`)
    .remove()
    .then(() => {
      const title = pictureNote && pictureNote.data ? pictureNote.data.title : 'Note';
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "success",
          title: `"${title}" was removed`,
          message: "",
          position: "bc",
          autoDismiss: 5
        }
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: `"${pictureNote.data.title}" - Remove failed`,
          message: error.message,
          position: "tr"
        }
      });
    });
};

export const rearrangePictureNotes = (pictureNotes) => dispatch => {
  const pictureNoteList = pictureNotes
    .map((note, index) => ({ ...note, index }))
    .reduce((note, item) => ({ ...note, [item.id]: item }), {});
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/image`)
    .update(pictureNoteList)
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Failed to rearrange category",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.UPDATE_PICTURENOTES
  });
};