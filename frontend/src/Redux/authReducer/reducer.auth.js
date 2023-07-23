import * as types from "./actionType.auth";

const initialState = {
    isAuth: false,
    token: "",
    isLoading: false,
    isError: false
}


const loginUserReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        // Login user
        case types.LOGIN_USER_REQUEST: {
            return { ...state, isLoading: true };
        }
        case types.LOGIN_USER_SUCCESS: {
            return { ...state, isLoading: false, token: payload, isAuth: true };
        }
        case types.LOGIN_USER_FAILURE: {
            return { ...state, isLoading: false, isError: true };
        }

        default: {
            return state;
        }
    }
}


export default loginUserReducer;