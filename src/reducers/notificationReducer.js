import { SHOW_NOTIFICATION } from "../constants/actionTypes";

const initialState = {
  notification: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: payload || {}
      };
    default:
      return state;
  }
}
