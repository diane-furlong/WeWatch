import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import errorReducer from "./errorReducers";
import GoogleAuth from './GoogleAuth'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    Google: GoogleAuth,
});