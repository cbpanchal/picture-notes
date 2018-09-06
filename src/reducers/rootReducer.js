import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import user from "./loginReducer";
import notification from "./notificationReducer";
import image from './pictureNotesReducer';

const rootReducer = combineReducers({
  user,
  notification,
  image,
  form: reduxFormReducer
});

export default rootReducer;
