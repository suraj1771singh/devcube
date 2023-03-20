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
export const store = legacy_createStore(rootReducer,compose(applyMiddleware(thunk)))

export type rootReducertype = ReturnType<typeof rootReducer>