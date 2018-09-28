import * as a from "../constants/actionTypes";

const initialState = {
  imageUrl: "",
  isLoading: false,
  pictureNotes: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case a.UPLOAD_IMAGE:
      return {
        ...state,
        imageUrl: payload
      };
    case a.SHOW_LOADER:
      return {
        ...state,
        isLoading: payload
      };
    case a.GET_PICTURENOTES:
      return {
        ...state,
        pictureNotes: payload
      };
    case a.UPDATE_PICTURENOTES:
      return {
        ...state
      };
    default:
      return state;
  }
}
