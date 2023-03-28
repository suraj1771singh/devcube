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
}from "./room.action.type";
import { createRoomApi, deleteRoomApi, getRoomsApi, updateRoomApi } from "./room.api";

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