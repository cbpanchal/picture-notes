import { combineReducers } from "redux";
import user from './loginReducer';
import { reducer as reduxFormReducer} from 'redux-form';
const rootReducer  = combineReducers({
    user,
    form: reduxFormReducer
});

export default rootReducer;