import firebase, { storage } from "../config/Fire";
import * as actionTypes from "../constants/actionTypes";

export const uploadImage = (image, close) => dispatch => {
    const { uid } = firebase.auth().currentUser;
    const imgParts = image.name.split('.');
    const uidPart = "_"+`${new Date().getTime()}` + "_" +`${uid}`;
    const newImage = imgParts[0]+`${uidPart}`+"."+imgParts[1];
    const uploadTask = storage.ref(`images/${newImage}`).put(image);
    uploadTask.on('state_changed',
        (snapshot) => {
            //progress func
            console.log(snapshot);
            dispatch({
                type: actionTypes.SHOW_LOADER,
                payload: true
            });
        },
        (error) => {
            console.log(error);
        },
        () => {
            //completed
            dispatch({
                type: actionTypes.SHOW_LOADER,
                payload: false
            });
            close();
            //const thumbnailImage = 'thumb_';
            // setTimeout(() => {
            //     storage.ref('images').child(`${thumbnailImage}${image.name}`).getDownloadURL().then(url => {
            //         console.log(url);
            //         saveImage(image.name, url)(dispatch);
            //         dispatch({
            //             type: actionTypes.UPLOAD_IMAGE,
            //             payload: url
            //         });
            //         close();
            //     })
            //     .catch(error => {
            //         console.log(error.message); 
            //         dispatch({
            //             type: actionTypes.SHOW_LOADER,
            //             payload: false
            //         });
            //         close();
            //     });
            // }, 4000);
        }
    )
};

const saveImage = (name, url) => dispatch => {
    const { uid } = firebase.auth().currentUser;
    const image = {
        id: new Date().getTime(),
        name: name,
        url: url
    };
    firebase
        .database()
        .ref(`users/${uid}/image/${image.id}`)
        .set(image)
        .then(() => {
            dispatch({
                type: actionTypes.SHOW_LOADER,
                payload: false
            });
        })
        .catch(error => {
            dispatch({
                type: actionTypes.SHOW_NOTIFICATION,
                payload: {
                    level: "error",
                    title: "Failed to Upload Image",
                    message: error.message,
                    position: "tr"
                }
            });
        });
};
