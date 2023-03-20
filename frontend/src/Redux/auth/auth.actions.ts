import { dispatchType, loginUserDataType, registerUserDataType } from "../../dataTypes";
import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_LOADING,
    USER_SIGNUP_SUCCESS
} from "./auth.actions.types"
import { loginUserApi, registerUserApi, updateTokenApi } from "./auth.api";

export const registerUser = (data: registerUserDataType) => async (dispatch: (arg: dispatchType) => void) => {
    dispatch({ type: USER_SIGNUP_LOADING })
    try {
        let res = await registerUserApi(data)
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: res?.data })
    } catch (err) {
        dispatch({ type: USER_SIGNUP_FAILURE })
    }
};

export const loginUser = (data: loginUserDataType) => async (dispatch: (arg: dispatchType) => void) => {
    dispatch({ type: USER_LOGIN_LOADING })
    try {
        let res = await loginUserApi(data)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res?.data })
    } catch (err) {
        dispatch({ type: USER_LOGIN_FAILURE })
    }
}

export const logoutUser = () => (dispatch: (arg: dispatchType) => void) => {
    dispatch({ type: USER_LOGOUT_LOADING })
    try {
        dispatch({ type: USER_LOGOUT_SUCCESS })
    } catch (err) {
        dispatch({ type: USER_LOGOUT_FAILURE })
    }
}

export const updateToken = (data:string) =>async(dispatch: (arg: dispatchType) => void)=> {
    try{
        // dispatch
        let res = await updateTokenApi(data)
        console.log(res)
        //dispatch
    }catch(err){
        // dispatch 
    }
    // try {
    //   const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
    //     refresh: authTokens.refresh,
    //   });
    //   const data = response.data;
    //   setAuthTokens(data);
    //   setUser(jwt_decode(data.access));
    //   localStorage.setItem("authTokens", JSON.stringify(data));
    // } catch (err) {
    //   // logoutUser();
    //   console.log("Session Expired, Login again");
    // }
    // if (loading) setLoading(false);
};