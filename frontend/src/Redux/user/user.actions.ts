import { Dispatch } from "redux";
import{GET_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_ERROR,FOLLOW_USER_LOADING,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_ERROR,
    UNFOLLOW_USER_LOADING,
    UNFOLLOW_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
UPDATE_USER_ERROR,
UPDATE_USER_LOADING,
    UNFOLLOW_USER_ERROR,} from "./user.actions.type"
import { followUserApi, getUserByIdApi, unfollowUserApi, updateUserApi } from "./user.api"

export const getUserById = (id:number)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_USER_LOADING})
    try{
        let res = await getUserByIdApi(id)
        dispatch({type:GET_USER_SUCCESS,payload:res.data})

    }catch(err){
        dispatch({type:GET_USER_ERROR})
    }
}

export const updateUser = (data:any)=>async(dispatch:Dispatch)=>{
    dispatch({type:UPDATE_USER_LOADING})
try{
    let res = await updateUserApi(data)
    console.log(res)
    dispatch({type:UPDATE_USER_SUCCESS})
}catch(err){
    dispatch({type:UPDATE_USER_ERROR})
}
}

export const followUser = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    dispatch({type:FOLLOW_USER_LOADING})
    try{
        let res = await followUserApi(id)
        console.log(res)
        dispatch({type:FOLLOW_USER_SUCCESS})
        }catch(err){
        dispatch({type:FOLLOW_USER_ERROR})
    }
}

export const unfollowUser = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    dispatch({type:UNFOLLOW_USER_LOADING})
    try{
        let res = await unfollowUserApi(id)
        console.log(res)
        dispatch({type:UNFOLLOW_USER_SUCCESS})
        }catch(err){
        dispatch({type:UNFOLLOW_USER_ERROR})
    }
}