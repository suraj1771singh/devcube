import { authUserDataType, loggedinUserType, userTokenType } from "../../dataTypes";
import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_LOADING,
    USER_SIGNUP_SUCCESS,
    USER_REFRESH_LOADING,
    USER_REFRESH_SUCCESS,
    LOGGED_IN_USER_DATA_LOADING,
    LOGGED_IN_USER_DATA_SUCCESS,
    LOGGED_IN_USER_DATA_FAILURE,
    USER_REFRESH_FAILURE,
} from "./auth.actions.types";
import jwt_decode from "jwt-decode"

let authTokens: string | null = localStorage.getItem("authTokens");
let authToken: userTokenType = authTokens ? (JSON.parse(authTokens)) : null
const data: loggedinUserType | null = authToken ? jwt_decode(authToken.access) : null;
const initialState: authUserDataType = {
    login_loading: false,
    login_error: false,
    isAuth: authToken ? true : false,
    signup_loading: false,
    signup_error: false,
    signup_success: false,
    myData: null,
    logout_loading: false,
    logout_error: false,
    myId: data ? data.user_id : null
}
export const authReducer = (state = initialState, actions: { type: string, payload: any }) => {
    const { type, payload } = actions;
    switch (type) {
        case USER_LOGIN_LOADING: {
            return { ...state, login_loading: true, login_error: false }
        }
        case USER_LOGIN_SUCCESS: {
            localStorage.setItem("authTokens", JSON.stringify(payload))
            return { ...state, isAuth: true, myData: jwt_decode(payload.access) }
        }
        case USER_LOGIN_FAILURE: {
            return { ...state, login_error: true, login_loading: false }
        }
        case USER_SIGNUP_LOADING: {
            return { ...state, signup_loading: true, signup_error: false }
        }
        case USER_SIGNUP_FAILURE: {
            return { ...state, signup_loading: false, signup_error: true }
        }
        case USER_SIGNUP_SUCCESS: {
            return { ...state, signup_loading: false, signup_error: false, signup_success: true }
        }
        case USER_LOGOUT_SUCCESS: {
            localStorage.removeItem("authTokens")
            return { ...state, isAuth: false, login_loading: false, login_error: false }
        }
        case USER_LOGOUT_FAILURE: {
            return {
                ...state, logout_loading: false,
                logout_error: true,
            }
        }
        case USER_LOGOUT_LOADING: {
            return {
                ...state, logout_loading: true,
                logout_error: false,
            }
        }
        case USER_REFRESH_LOADING: {
            return { ...state }
        }
        case USER_REFRESH_SUCCESS: {
            localStorage.setItem("authTokens", JSON.stringify(payload))
            return { ...state, isAuth: true, myData: jwt_decode(payload.access) }
        }
        case USER_REFRESH_FAILURE: {
            return { ...state, isAuth: false }
        }
        case LOGGED_IN_USER_DATA_LOADING:{
            return{...state}
        }
case LOGGED_IN_USER_DATA_SUCCESS:{
    return {...state,myData:payload}
}
case LOGGED_IN_USER_DATA_FAILURE:{
    return {...state,}
}
        default: {
            return { ...state }
        }
    }

}