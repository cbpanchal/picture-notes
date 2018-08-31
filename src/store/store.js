import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "../reducers/rootReducer";

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;