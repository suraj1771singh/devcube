import {USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_SIGNUP_LOADING,
    USER_SIGNUP_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_LOADING,
    USER_SIGNUP_SUCCESS} from "./auth.actions.types";

    let authTokens:any = localStorage.getItem("authTokens");
    authTokens = JSON.parse(authTokens) || null
    let token:string|undefined = authTokens.token;

    const initialState = {
        login_loading:false,
        login_error:false,
        isAuth:token?true:false,
        signup_loading:false,
        signup_error:false,
        userData:[],
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
            return {...state, isAuth:true }
        }
        case USER_LOGIN_FAILURE:{
            return {...state, login_error:true, login_loading:false }
        }
        case USER_SIGNUP_LOADING:{
            return {...state,  }
        }
        case USER_SIGNUP_FAILURE:{
            return {...state,  }
        }
        case USER_SIGNUP_SUCCESS:{
            return {...state,  }
        }
        case USER_LOGOUT_SUCCESS:{
            return {...state,  }
        }
        case USER_LOGOUT_FAILURE:{
            return {...state,  }
        }
        case USER_LOGOUT_LOADING:{
            return {...state,  }
        }
        
        default:{
            return {initialState}
        }
    }
    
}