import { Dispatch } from "redux";
import {
    GET_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_ERROR, FOLLOW_USER_LOADING,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_ERROR,
    UNFOLLOW_USER_LOADING,
    UNFOLLOW_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_LOADING,
    UNFOLLOW_USER_ERROR,
    GET_FOLLOWERS_LOADING,
GET_FOLLOWERS_SUCCESS,
GET_FOLLOWERS_ERROR,
GET_FOLLOWING_LOADING,
GET_FOLLOWING_SUCCESS,
PROFILE_PHOTO_LOADING,
PROFILE_PHOTO_SUCCESS,
PROFILE_PHOTO_ERROR,
GET_FOLLOWING_ERROR,
} from "./user.actions.type"
import { followUserApi, getUserByIdApi, unfollowUserApi, updateUserApi, getFollowersApi, getFollowingApi, updateUserProfileApi } from "./user.api"

export const getUserById = (id: number | string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_LOADING })
    try {
        let res = await getUserByIdApi(id)
        dispatch({ type: GET_USER_SUCCESS, payload: res.data })

    } catch (err) {
        dispatch({ type: GET_USER_ERROR })
    }
}

export const updateUser = (data: any) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_LOADING })
    try {
        await updateUserApi(data)
        dispatch({ type: UPDATE_USER_SUCCESS })
    } catch (err) {
        dispatch({ type: UPDATE_USER_ERROR })
    }
}

export const followUser = (id: string | number) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: FOLLOW_USER_LOADING })
    try {
        await followUserApi(id)
        dispatch({ type: FOLLOW_USER_SUCCESS, })
    } catch (err) {
        dispatch({ type: FOLLOW_USER_ERROR })
    }
}

export const unfollowUser = (id: string | number) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: UNFOLLOW_USER_LOADING })
    try {
        await unfollowUserApi(id)
        dispatch({ type: UNFOLLOW_USER_SUCCESS })
    } catch (err) {
        dispatch({ type: UNFOLLOW_USER_ERROR })
    }
}

export const getFollowers = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch({type:GET_FOLLOWERS_LOADING})
    try {
        let res = await getFollowersApi(id);
        dispatch({type:GET_FOLLOWERS_SUCCESS,payload:res.data})
    } catch (err) {
        dispatch({type:GET_FOLLOWERS_ERROR})
    }
}

export const getFollowing = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch({type:GET_FOLLOWING_LOADING})
    try {
        let res = await getFollowingApi(id)
        dispatch({type:GET_FOLLOWING_SUCCESS,payload:res.data})
    } catch (err) {
        dispatch({ type:GET_FOLLOWING_ERROR})
    }
}

export const updateUserProfile = (data:any)=>async(dispatch:Dispatch)=>{
    dispatch({type:PROFILE_PHOTO_LOADING})
    try{
let res = await updateUserProfileApi(data);
if(res){
    dispatch({type:PROFILE_PHOTO_SUCCESS,payload:res.data.url})
}
    }catch(err){
        dispatch({type:PROFILE_PHOTO_ERROR})
    }
}