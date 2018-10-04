import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import user from "./loginReducer";
import notification from "./notificationReducer";
import pictureNote from "./pictureNotesReducer";
import tags from "./tagReducer";

const rootReducer = combineReducers({
  user,
  notification,
  pictureNote,
  tags,
  form: reduxFormReducer
});

export default rootReducer;
