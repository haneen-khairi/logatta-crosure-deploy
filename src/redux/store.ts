import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./reducers/auth";
import loading from "./reducers/loading";
import notifications from "./reducers/notifications";
import data from "./reducers/data";

const store = createStore(
  combineReducers({ notifications, loading, auth, data }),
  composeWithDevTools(
    applyMiddleware()
    // other store enhancers if any
  )
);

export default store;
