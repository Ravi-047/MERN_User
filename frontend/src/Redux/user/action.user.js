import axios from "axios"
import * as types from "./actionType.user"

const baseUrl = "http://localhost:8080"

const addUser = (payload) => async (dispatch) => {
    dispatch({ type: types.ADD_USER_REQUEST });
    try {
        const response = await axios.post(`${baseUrl}/users`, payload)
        dispatch({ type: types.ADD_USER_SUCCESS, payload: response.data })
        return response
    } catch (error) {
        dispatch({ type: types.ADD_USER_FAILURE, payload: error })
    }
}


const getUser = () => async (dispatch) => {
    dispatch({ type: types.GET_USER_FAILURE });
    try {
        const response = await axios.get(`${baseUrl}/users`);
        dispatch({ type: types.GET_USER_SUCCESS, payload: response.data });
        return response.status
    } catch (error) {
        dispatch({ type: types.GET_USER_FAILURE, payload: error })
    }
}

const updateUser = (id, token, payload) => async (dispatch) => {
    console.log(id, token, payload);
    dispatch({ type: types.UPDATE_USER_REQUEST });
    try {
        const response = await axios.patch(`${baseUrl}/users/${id}`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: response.data })
        return response.status
    } catch (error) {
        dispatch({ type: types.UPDATE_USER_FAILURE, payload: error })
    }
}

const deleteUser = (id, token) => async (dispatch) => {
    dispatch({ type: types.DELETE_USER_REQUEST });
    try {

        const response = await axios.delete(`${baseUrl}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({ type: types.DELETE_USER_SUCCESS, payload: id })

        return response.status
    } catch (error) {
        dispatch({ type: types.DELETE_USER_FAILURE, payload: error })
    }
}



export { addUser, getUser, updateUser, deleteUser }