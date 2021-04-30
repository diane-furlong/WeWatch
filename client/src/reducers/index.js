import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import errorReducer from "./errorReducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});