import { Dispatch } from "redux";
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
GET_ROOM_BY_ID_LOADING,
GET_ROOM_BY_ID_ERROR,
GET_ROOM_BY_ID_SUCCESS,GET_ROOMS_JOINED_BY_USER_LOADING,
GET_ROOMS_JOINED_BY_USER_ERROR,
GET_ROOMS_JOINED_BY_USER_SUCCESS,
GET_ROOMS_BY_TOPICS_LOADING,
GET_ROOMS_BY_TOPICS_ERROR,
GET_ROOMS_BY_TOPICS_SUCCESS,
GET_ROOMS_BY_SEARCH_LOADING,
GET_ROOMS_BY_SEARCH_ERROR,
GET_ROOMS_BY_SEARCH_SUCCESS,
RESET_CREATE_ROOM_DATA,
RESET_UPDATE_ROOM_DATA
}from "./room.action.type";
import { createRoomApi, deleteRoomApi, getRoomByIdApi, getRoomByUserIdApi, getRoomsApi, getRoomsByTopicApi, getRoomsJoinedByUserApi, getRoomsSearchApi, joinRoomApi, leaveRoomApi, updateRoomApi } from "./room.api";

export const getRooms = ()=>async(dispatch:Dispatch)=>{
    console.log("called")
    dispatch({type:GET_ROOM_LOADING})
    try{
        let res = await getRoomsApi()
        dispatch({type:GET_ROOM_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:GET_ROOM_ERROR})
    }
}

export const createRoom = (data:createRoomDataType)=>async(dispatch: Dispatch)=>{
    dispatch({type:CREATE_ROOM_LOADING})
    try{
       let res =  await createRoomApi(data)
       console.log(res)
        dispatch({type:CREATE_ROOM_SUCCESS})
    }catch(err){
        dispatch({type:CREATE_ROOM_ERROR})
    }
}
export const updateRoom = (data:any)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:UPDATE_ROOM_LOADING})
    try{
        await updateRoomApi(data)
        dispatch({type:UPDATE_ROOM_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:UPDATE_ROOM_ERROR})
    }
}

export const deleteRoom = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:DELETE_ROOM_LOADING})
    try{
        await deleteRoomApi(id)
        dispatch({type:DELETE_ROOM_SUCCESS,payload:id})
    }catch(err){
        dispatch({type:DELETE_ROOM_ERROR})
    }
}

export const getRoomByUserId = (id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_ROOM_BY_USER_LOADING})
    try{
        let res = await getRoomByUserIdApi(id)
        dispatch({type:GET_ROOM_BY_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_ROOM_BY_USER_ERROR})
    }
} 

export const joinRoom = (id:string|number,user:{id:string|number,email:string})=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:JOIN_ROOM_LOADING})
try{
    await joinRoomApi(id);
    dispatch({type:JOIN_ROOM_SUCCESS,payload:{id,user}})
}catch(err){
    dispatch({type:JOIN_ROOM_ERROR})
}
}

export const leaveRoom = (id:string|number,user:{id:string|number,email:string})=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:LEAVE_ROOM_LOADING})
try{
    await leaveRoomApi(id)
    dispatch({type:LEAVE_ROOM_SUCCESS,payload:{id,user}})

}catch(err){
    dispatch({type:LEAVE_ROOM_ERROR})
}
}
export const getRoombyId = (id:string|number)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
dispatch({type:GET_ROOM_BY_ID_LOADING})
try{
    let res = await getRoomByIdApi(id)
    dispatch({type:GET_ROOM_BY_ID_SUCCESS,payload:res.data})
}catch(er){
    dispatch({type:GET_ROOM_BY_ID_ERROR})
}
}


 export const getRoomsJoinedByUser = ()=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_ROOMS_JOINED_BY_USER_LOADING})
    try{
        let res = await getRoomsJoinedByUserApi()
        dispatch({type:GET_ROOMS_JOINED_BY_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_ROOMS_JOINED_BY_USER_ERROR})
    }
 }

 export const getRoomsByTopic = (id:number[])=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_ROOMS_BY_TOPICS_LOADING})
    try{
        let res = await getRoomsByTopicApi(id)
        dispatch({type:GET_ROOMS_BY_TOPICS_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_ROOMS_BY_TOPICS_ERROR})
    }
 }

 export const getRoomsSearch = (data:string)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_ROOMS_BY_SEARCH_LOADING})
    try{
        let res = await getRoomsSearchApi(data)
        dispatch({type:GET_ROOMS_BY_SEARCH_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_ROOMS_BY_SEARCH_ERROR})
    }
 }

 export const resetCreateRoomData= ()=>(dispatch:Dispatch)=>{
    dispatch({type:RESET_CREATE_ROOM_DATA})
 }
 export const resetUpdateRoomData= ()=>(dispatch:Dispatch)=>{
    dispatch({type:RESET_UPDATE_ROOM_DATA})
 }