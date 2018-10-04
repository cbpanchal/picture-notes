import firebase, { storage } from "../config/Fire";
import * as actionTypes from "../constants/actionTypes";
import convertObjToArr from "../reducers/helper";

export const savePictureNote = (key, file, id) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  let pictureTitle = "";
  let pictureNote = "";
  let pictureTags = "";
  if (file && file !== undefined) {
    pictureTitle = file.title;
    pictureNote = file.note;
    pictureTags = file.tags;
  }
  const image = {
    title: pictureTitle || "",
    note: pictureNote || "",
    tags: pictureTags || ""
  };
  firebase
    .database()
    .ref(`users/${uid}/image/${id}/category/images/${key}`)
    .set(image)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

export const uploadImage = (images, close, inputArray) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const newImages = {
    fileName: [],
    image: [],
    timeStampArray: []
  };
  let imgobj = null;
  let oldTimeStamp = null;
  images.map(image => {
    imgobj = image;
    const imgName = image.name.split(".").shift();
    const extension = image.name.split(".").pop();
    oldTimeStamp = new Date().getTime();
    newImages.timeStampArray.push(oldTimeStamp);
    const uidPart = `_${oldTimeStamp}_${uid}`;
    newImages.fileName.push(`${imgName}${uidPart}.${extension}`);
    newImages.image.push(imgobj);
    return false;
  });
  const imagesData = convertObjToArr(newImages);
  const [file, obj] = imagesData;
  const fileArray = Object.values(file);
  const objArray = Object.values(obj);
  const newArray = fileArray.map((name, index) => [
    name,
    objArray[index],
    inputArray[index]
  ]);
  const finalArray = newArray.slice(0, -1);
  return new Promise((resolve, reject) => {
    finalArray.map((imgFile, index) => {
      const key = new Date().getTime() + index;
      savePictureNote(key, imgFile[2], oldTimeStamp)(dispatch);
      const uploadTask = storage
        .ref(`images/${key}/${imgFile[0]}`)
        .put(imgFile[1]);
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
          setTimeout(() => {
            resolve();
            dispatch({
              type: actionTypes.SHOW_LOADER,
              payload: false
            });
            close();
          }, 7000);
        }
      );
      return false;
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
        // .sort((a, b) => a.index - b.index || a.id - b.id);
        dispatch({
          type: actionTypes.GET_PICTURENOTES,
          payload: pictureNotes
        });
      });
  }
};

export const updatePictureNote = (note, pictureNote) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/image/${note.categoryId}/category/images/${note.id}`)
    .update(pictureNote);
};

export const removePictureNote = pictureNote => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/image/${pictureNote.categoryId}`)
    .remove()
    .then(() => {
      const title = "Note";
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
          title: " - Remove failed",
          message: error.message,
          position: "tr"
        }
      });
    });
};

export const rearrangePictureNotes = pictureNotes => dispatch => {
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
