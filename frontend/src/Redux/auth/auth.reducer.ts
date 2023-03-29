import { authUserDataType, userTokenType } from "../../dataTypes";
import {USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_LOADING,
    USER_SIGNUP_SUCCESS, USER_REFRESH_LOADING,
    USER_REFRESH_SUCCESS,
    USER_REFRESH_FAILURE,} from "./auth.actions.types";
import jwt_decode from "jwt-decode"


    let authTokens:string|null = localStorage.getItem("authTokens");
    let authToken:userTokenType = authTokens?(JSON.parse(authTokens)):null
    const initialState:authUserDataType = {
        login_loading:false,
        login_error:false,
        isAuth:authToken?true:false,
        signup_loading:false,
        signup_error:false,
        myData:authToken?jwt_decode(authToken.access):null,
        token:authToken,
        logout_loading:false,
        logout_error:false,
    }
export const authReducer = (state=initialState,actions:{type:string,payload:any})=>{
    const {type,payload} = actions;
    switch (type) {
        case USER_LOGIN_LOADING:{
            return {...state,   }
        }
        case USER_LOGIN_SUCCESS:{
            localStorage.setItem("authTokens",JSON.stringify(payload))
            return {...state, isAuth:true,myData:jwt_decode(payload.access)}
        }
        case USER_LOGIN_FAILURE:{
            return {...state, login_error:true, login_loading:false }
        }
        case USER_SIGNUP_LOADING:{
            return {...state, signup_loading:true, signup_error:false}
        }
        case USER_SIGNUP_FAILURE:{
            return {...state, signup_loading:false, signup_error:true}
        }
        case USER_SIGNUP_SUCCESS:{
            return {...state, signup_loading:false, signup_error:false}
        }
        case USER_LOGOUT_SUCCESS:{
            localStorage.removeItem("authTokens")
            return {...state, isAuth:false,login_loading:false, login_error:false}
        }
        case USER_LOGOUT_FAILURE:{
            return {...state, logout_loading:false,
                logout_error:true, }
        }
        case USER_LOGOUT_LOADING:{
            return {...state, logout_loading:true,
                logout_error:false,}
        }
        case USER_REFRESH_LOADING:{
            return {...state}
        }
        case USER_REFRESH_SUCCESS:{
            localStorage.setItem("authTokens",JSON.stringify(payload))
            return {...state, isAuth:true,myData:jwt_decode(payload.access)}
        }
        case USER_REFRESH_FAILURE:{
            return {...state, isAuth:false}
        }
        
        default:{
            return {...state}
        }
    }
    
}