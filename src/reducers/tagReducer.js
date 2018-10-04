import * as a from "../constants/actionTypes";

const initialState = {
  tagList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case a.SET_TAG_LIST: {
      return {
        ...state,
        tagList: action.payload
      };
    }
    case a.ADD_TAGS_TO_USER: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
