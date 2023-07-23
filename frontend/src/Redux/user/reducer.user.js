import * as types from "./actionType.user"


const initialState = {
    users: [],
    isLoading: false,
    isError: false,
}

const usersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        // getting USER
        case types.GET_USER_REQUEST: {
            return { ...state, isLoading: true, isError: false, payload }
        }
        case types.GET_USER_SUCCESS: {
            return { ...state, isLoading: false, isError: false, users: payload }
        }
        case types.GET_USER_FAILURE: {
            return { ...state, isLoading: false, isError: true }
        }

        // add USER 
        case types.ADD_USER_REQUEST: {
            return { ...state, isLoading: true, isError: false };
        }
        case types.ADD_USER_SUCCESS: {
            console.log(payload, " this is payload");
            return { ...state, isLoading: false, isError: false, users: [...state.users, payload] };
        }
        case types.ADD_USER_FAILURE: {
            return { ...state, isLoading: false, isError: true }
        }

        // update USER
        case types.UPDATE_USER_REQUEST: {
            return { ...state, isLoading: true, isError: false }
        }
        case types.UPDATE_USER_SUCCESS: {
            let newUser = state.users.map((item) => {
                return item.id === payload.id ? payload : item;
            })
            return { ...state, isLoading: false, isError: false, users: newUser }
        }
        case types.UPDATE_USER_FAILURE: {
            return { ...state, isLoading: false, isError: true }
        }

        // delete USER
        case types.DELETE_USER_REQUEST: {
            return { ...state, isLoading: true, isError: false }
        }
        case types.DELETE_USER_SUCCESS: {
            const filteredData = state.users.filter((item) => item.id !== payload)
            return { ...state, isLoading: false, isError: false, users: filteredData }
        }

        case types.DELETE_USER_FAILURE: {
            return { ...state, isLoading: false, isError: true };
        }

        default: {
            return state
        }
    }
}

export default usersReducer;