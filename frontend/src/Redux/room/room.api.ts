import axios from "axios";
import { createRoomDataType } from "../../dataTypes";
let baseUrl = process.env.REACT_APP_BASE_URL;
export const getRoomsApi = async(token:string)=>{
    try{
        let res = await axios.get(`${baseUrl}/rooms/`,{
            headers:{
                Authorization: "Bearer " + String(token)
            }
        })
        return res
    }catch(err){
        throw err
    }
} 

export const createRoomApi = (data:createRoomDataType,token:string)=>{
    try{
        let res = axios.post(`${baseUrl}/createroom`,{Headers:{Authorization: "Bearer " + String(token)},data})
        return res
    }catch(err){
        throw err
    }
}

export const updateRoomApi = ()=>{
    try{

    }catch(err){
        throw err
    }
}

export const deleteRoomApi = async(id:string)=>{
    try{
        let res = await axios.delete(`${baseUrl}/rooms/${id}`)
        return res
    }catch(err){
        throw err
    }
}