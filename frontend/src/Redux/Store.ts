import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from "redux-thunk"
import {authReducer} from "./auth/auth.reducer";
import { roomReducer } from './room/room.reducer';
import { themeReducer } from './theme/theme.reducer';
import { topicsReducer } from './topic/topics.reducer';
import { userReducer } from './user/user.reducer';
import { commentReducer } from './comments/comment.redux';

const rootReducer = combineReducers({
    auth:authReducer,
    rooms:roomReducer,
    topics:topicsReducer,
    theme:themeReducer,
    user:userReducer,
    comments:commentReducer
})
export const store = legacy_createStore(rootReducer,compose(applyMiddleware(thunk)))

export type rootReducertype = ReturnType<typeof rootReducer>