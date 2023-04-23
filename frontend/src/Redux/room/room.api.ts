import axios from "axios";
import { createRoomDataType, userTokenType } from "../../dataTypes";
let baseUrl = process.env.REACT_APP_BASE_URL;

export const getRoomsApi = async()=>{
    try {
        let token:any = sessionStorage.getItem("authTokens");
            let authToken:userTokenType = JSON.parse(token);
            let data = authToken.access;
        const res = await axios.get(`${baseUrl}/rooms/`,{headers:{Authorization:`Bearer ${data}`}});
          return res.data
    }catch(err){
        throw err
    }
} 

export const createRoomApi = async(data:createRoomDataType)=>{
     try{

        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.post(`${baseUrl}/createroom/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
        throw err
    }
}

export const updateRoomApi = (data:any)=>{
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


export const getRoomByUserIdApi = async(id:string|number)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/rooms-user/${id}/`,{headers:{Authorization:`Bearer ${token}`}});
        return res
    }catch(err){
        throw err
    }
}

export const joinRoomApi = async(id:string|number)=>{
try{
    let tokenAll:any = sessionStorage.getItem("authTokens");
    let authToken:userTokenType = JSON.parse(tokenAll);
    let token = authToken.access;
    let res = await axios({
        method: "PATCH",
        url: `${baseUrl}/room-add-participant/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    return res
}catch(err){
    throw err
}
}

export const leaveRoomApi = async(id:string|number)=>{
try{
    let tokenAll:any = sessionStorage.getItem("authTokens");
    let authToken:userTokenType = JSON.parse(tokenAll);
    let token = authToken.access;
    let res = await axios({
        method: "PATCH",
        url: `${baseUrl}/room-remove-participant/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    return res
}catch(err){
    throw err
}
}

export const getRoomByIdApi = async(id:string|number)=>{
    try{
    let tokenAll:any = sessionStorage.getItem("authTokens");
    let authToken:userTokenType = JSON.parse(tokenAll);
    let token = authToken.access;
        let res = await axios.get(`${baseUrl}/room/${id}/`,{headers:{Authorization:`Bearer ${token}`}})
        return res;
    }catch(err){
        throw err
    } 
}

export const getRoomsJoinedByUserApi = async()=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
            let res = await axios.get(`${baseUrl}/rooms-joined/`,{headers:{Authorization:`Bearer ${token}`}})
            return res;
        }catch(err){
            throw err
        } 
}
export const getRoomsByTopicApi = async(id:number[])=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
            let res = await axios.get(`${baseUrl}/rooms-topic/?ids=${id.join(",")} `,{headers:{Authorization:`Bearer ${token}`}})
            return res;
    }catch(err){
        throw err
    }
} 