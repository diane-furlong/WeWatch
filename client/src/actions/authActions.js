import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { AUTH } from '../constants/actionTypes';
import * as api from '../API'; // not sure if I need this yet
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";
// // Register User
// export const registerUser = (userData, history) => dispatch => {
//     axios
//         .post("/api/users/register", userData)
//         .then(res => history.push("/login")) // re-direct to login on successful register
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };
// // Login - get user token
// // 24-45 is login user but may all get deleted
// export const loginUser = userData => dispatch => {
//     axios
//         .post("/api/users/login", userData)
//         .then(res => {
//             // Save to localStorage
//             // Set token to localStorage
//             const { token } = res.data;
//             localStorage.setItem("jwtToken", token);
//             // Set token to Auth header
//             setAuthToken(token);
//             // Decode token to get user data
//             const decoded = jwt_decode(token);
//             // Set current user
//             dispatch(setCurrentUser(decoded));
//         })
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };
// // Set logged in user
// export const setCurrentUser = decoded => {
//     return {
//         type: SET_CURRENT_USER,
//         payload: decoded
//     };
// };
// // User loading
// export const setUserLoading = () => {
//     return {
//         type: USER_LOADING
//     };
// };
// // Log user out
// export const logoutUser = () => dispatch => {
//     // Remove token from local storage
//     localStorage.removeItem("jwtToken");
//     // Remove auth header for future requests
//     setAuthToken(false);
//     // Set current user to empty object {} which will set isAuthenticated to false
//     dispatch(setCurrentUser({}));
// };

// all below code is for JWT form data

export const login = (formData, histroy) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);

        dispatch({ type: AUTH, data})

        histroy.push('/')

    } catch (error) {
        console.log(error)

    }
}

export const signup = (formData, histroy) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data })

        histroy.push('/')

    } catch (error) {
        console.log(error)

    }
}