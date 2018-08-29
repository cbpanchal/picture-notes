import { combineReducers } from "redux";
import user from './loginReducer';

const rootReducer  = combineReducers({
    user
});

export default rootReducer;