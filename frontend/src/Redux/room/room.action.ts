import { createRoomDataType } from "../../dataTypes";
import{
    CREATE_ROOM_LOADING,
CREATE_ROOM_SUCCESS,
CREATE_ROOM_ERROR,
UPDATE_ROOM_LOADING,
UPDATE_ROOM_SUCCESS,
UPDATE_ROOM_ERROR,
DELETE_ROOM_LOADING,
DELETE_ROOM_ERROR,
DELETE_ROOM_SUCCESS,
GET_ROOM_LOADING,
GET_ROOM_ERROR,
GET_ROOM_SUCCESS,
GET_ROOM_BY_USER_LOADING,
GET_ROOM_BY_USER_ERROR,
GET_ROOM_BY_USER_SUCCESS,
JOIN_ROOM_LOADING,
JOIN_ROOM_ERROR,
JOIN_ROOM_SUCCESS,
LEAVE_ROOM_LOADING,
LEAVE_ROOM_ERROR,
LEAVE_ROOM_SUCCESS,
}from "./room.action.type";
import { createRoomApi, deleteRoomApi, getRoomByUserIdApi, getRoomsApi, joinRoomApi, updateRoomApi } from "./room.api";

export const getRooms = ()=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:GET_ROOM_LOADING})
    try{
        let res = await getRoomsApi()
        dispatch({type:GET_ROOM_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:GET_ROOM_ERROR})
    }
}

export const createRoom = (data:createRoomDataType)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:CREATE_ROOM_LOADING})
    try{
        let res = await createRoomApi(data)
        console.log(res)
        dispatch({type:CREATE_ROOM_SUCCESS})
    }catch(err){
        dispatch({type:CREATE_ROOM_ERROR})
    }
}
export const updateRoom = ()=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:UPDATE_ROOM_LOADING})
    try{
        let res = updateRoomApi()
        console.log(res)
        dispatch({type:UPDATE_ROOM_SUCCESS})
    }catch(err){
        dispatch({type:UPDATE_ROOM_ERROR})
    }
}

export const deleteRoom = (id:string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:DELETE_ROOM_LOADING})
    try{
        let res = deleteRoomApi(id)
        console.log(res)
        dispatch({type:DELETE_ROOM_SUCCESS})
    }catch(err){
        dispatch({type:DELETE_ROOM_ERROR})
    }
}

export const getRoomByUserId = (id:string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:GET_ROOM_BY_USER_LOADING})
    try{
        let res = await getRoomByUserIdApi(id)
        dispatch({type:GET_ROOM_BY_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_ROOM_BY_USER_ERROR})
    }
} 

export const joinRoom = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:JOIN_ROOM_LOADING})
try{
    let res = await joinRoomApi(id);
    console.log(res)
    dispatch({type:JOIN_ROOM_SUCCESS,payload:id})
}catch(err){
    dispatch({type:JOIN_ROOM_ERROR})
}
}

export const leaveRoom = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{

}