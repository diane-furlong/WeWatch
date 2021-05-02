import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return { ...state, authData: action?.data };
            case LOGOUT:
                localStorage.clear();
        default:
            return state;
    }
}

export default authReducer