import axios from "axios"
import { userTokenType } from "../../dataTypes";
let baseUrl = process.env.REACT_APP_BASE_URL;

export const getRecentCommentsApi = async()=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/msgs/`,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
        throw err
}
}

export const getRoomCommentsApi = async(id:string|number)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/msgs-room/${id}/`,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
        throw err
    }
}
export const getrepliesOfCommentApi = async(parentId:string|number,id:string|number)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/msgs-room/${id}/`,{data:{parent:parentId},headers:{Authorization:`Bearer ${token}`}})
       return res
    }catch(err){
        throw err
    }
} 

export const getUserCommentsApi = async(id:string|number)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/msgs-user/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
        throw err
    }
}

export const createCommentsApi = async(data:any,id:string|number)=>{
    console.log(data)
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.post(`${baseUrl}/createMsg/${id}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
        throw err
    }
}

export const updateCommentsApi = async(data:any)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.patch(`${baseUrl}/msg-update/${data.id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){throw err}
}

export const deleteCommentsApi = async(id:string|number)=>{
    try{
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.post(`${baseUrl}/msg-delete/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){throw err}
}