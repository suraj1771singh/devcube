import { Dispatch } from 'redux'
import {GET_RECENT_COMMENTS_LOADING,
    GET_RECENT_COMMENTS_SUCCESS,
    GET_RECENT_COMMENTS_ERROR,
    GET_ROOM_COMMENTS_LOADING,
    GET_ROOM_COMMENTS_SUCCESS,
    GET_ROOM_COMMENTS_ERROR,
    GET_USER_COMMENTS_LOADING,
    GET_USER_COMMENTS_SUCCESS,
    GET_USER_COMMENTS_ERROR,
    CREATE_COMMENTS_LOADING,
    CREATE_COMMENTS_SUCCESS,
    CREATE_COMMENTS_ERROR,
    UPDATE_COMMENTS_LOADING,
    UPDATE_COMMENTS_SUCCESS,
    UPDATE_COMMENTS_ERROR,
    DELETE_COMMENTS_LOADING,
    DELETE_COMMENTS_SUCCESS,
    DELETE_COMMENTS_ERROR,
} from './comments.action.types'
import { createCommentsApi, deleteCommentsApi, getRecentCommentsApi, getRoomCommentsApi, getUserCommentsApi, updateCommentsApi } from './comments.api'


export const getRecentComments = () => async (dispatch: Dispatch) => {
    dispatch({ type: GET_RECENT_COMMENTS_LOADING })
    try {
        let res = await getRecentCommentsApi();
        dispatch({ type: GET_RECENT_COMMENTS_SUCCESS,payload:res.data })
    } catch (err) {
        dispatch({ type: GET_RECENT_COMMENTS_ERROR })
    }
}

export const getRoomComments = (id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_ROOM_COMMENTS_LOADING})
try{
    let res = await getRoomCommentsApi(id)
    console.log(res)
    dispatch({type:GET_ROOM_COMMENTS_SUCCESS})
}catch(err){
    dispatch({type:GET_ROOM_COMMENTS_ERROR})
}
}
export const getUserComments = (id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_USER_COMMENTS_LOADING})
try{
    let res = await getUserCommentsApi(id)
    console.log(res)
    dispatch({type:GET_USER_COMMENTS_SUCCESS})
}catch(err){
    dispatch({type:GET_USER_COMMENTS_ERROR})
}
}
export const createComments = (data:any,id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:CREATE_COMMENTS_LOADING})
try{
    let res = await createCommentsApi(data,id)
    dispatch({type:CREATE_COMMENTS_SUCCESS,payload:res.data})
}catch(err){
    dispatch({type:CREATE_COMMENTS_ERROR})
}
}

export const updateComments = (data:any)=>async(dispatch:Dispatch)=>{
    dispatch({type:UPDATE_COMMENTS_LOADING})
try{
    let res = await updateCommentsApi(data)
    console.log(res)
    dispatch({type:UPDATE_COMMENTS_SUCCESS})
}catch(err){
    dispatch({type:UPDATE_COMMENTS_ERROR})
}
}
export const deleteComments = (id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:DELETE_COMMENTS_LOADING})
try{
    let res = await deleteCommentsApi(id)
    console.log(res)
    dispatch({type:DELETE_COMMENTS_SUCCESS})
}catch(err){
    dispatch({type:DELETE_COMMENTS_ERROR})
}
}