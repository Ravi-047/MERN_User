import axios from "axios";
import * as types from "./actionType.auth"

const loginUser = (payload) => async (dispatch) => {
    dispatch({ type: types.LOGIN_USER_REQUEST });
    try {
        const res = await axios.post("https://zany-pear-mussel-tux.cyclic.app/", payload);
        dispatch({ type: types.LOGIN_USER_SUCCESS, payload: res.data });
        return res

    } catch (error) {
        dispatch({ type: types.LOGIN_USER_FAILURE, payload: error })
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';

const logoutUser = () => (dispatch) => {
    dispatch({ type: types.LOGOUT_USER_REQUEST });
    dispatch({ type: types.LOGOUT_USER_SUCCESS });
    dispatch({ type: types.LOGOUT_USER_FAILURE });
};

export { loginUser, logoutUser }