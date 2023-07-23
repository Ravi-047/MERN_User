import { legacy_createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import usersReducer from "./user/reducer.user";
import loginUserReducer from "./authReducer/reducer.auth";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    usersReducer,
    loginUserReducer
})


const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;