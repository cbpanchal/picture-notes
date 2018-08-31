import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import user from "./loginReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  user,
  notification,
  form: reduxFormReducer
});

export default rootReducer;
