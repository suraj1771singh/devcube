import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from "redux-thunk"
import {authReducer} from "./auth/auth.reducer";

const rootReducer = combineReducers({
    auth:authReducer
})

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = legacy_createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))