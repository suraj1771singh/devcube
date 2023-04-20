import { Dispatch } from "redux";
import { loginUserDataType, registerUserDataType } from "../../dataTypes";
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
    USER_REFRESH_FAILURE,
    LOGGED_IN_USER_DATA_LOADING,
    LOGGED_IN_USER_DATA_SUCCESS,
    LOGGED_IN_USER_DATA_FAILURE,
} from "./auth.actions.types"
import { getLoggedinUserProfileApi, loginUserApi, registerUserApi, updateTokenApi } from "./auth.api";

export const registerUser = (data: registerUserDataType) => async (dispatch:Dispatch) => {
    dispatch({ type: USER_SIGNUP_LOADING })
    try {
        let res = await registerUserApi(data)
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: res })
    } catch (err) {
        dispatch({ type: USER_SIGNUP_FAILURE })
    }
};

export const loginUser = (data: loginUserDataType) => async (dispatch:Dispatch) => {
    dispatch({ type: USER_LOGIN_LOADING })
    try {
        let res = await loginUserApi(data)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res?.data })
    } catch (err) {
        dispatch({ type: USER_LOGIN_FAILURE })
    }
}
export const logoutUser = () => (dispatch:Dispatch) => {
    dispatch({ type: USER_LOGOUT_LOADING })
    try {
        dispatch({ type: USER_LOGOUT_SUCCESS })
    } catch (err) {
        dispatch({ type: USER_LOGOUT_FAILURE })
    }
}

export const updateToken = () => async (dispatch:Dispatch) => {
    
    try {
        dispatch({ type: USER_REFRESH_LOADING })
        let res = await updateTokenApi()
        dispatch({ type: USER_REFRESH_SUCCESS, payload: res })
    } catch (err) {
        dispatch({ type: USER_REFRESH_FAILURE })
    }
};
 
export const getLoggedinUserProfile = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGGED_IN_USER_DATA_LOADING })
    try {
        let res = await getLoggedinUserProfileApi(id)
        dispatch({ type: LOGGED_IN_USER_DATA_SUCCESS,payload:res.data })
    } catch (err) {
        console.log(err)
        dispatch({ type: LOGGED_IN_USER_DATA_FAILURE })
    }
}