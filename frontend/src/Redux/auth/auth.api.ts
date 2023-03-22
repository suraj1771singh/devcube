import axios from "axios";
import { loginUserDataType, registerUserDataType } from "../../dataTypes";

let baseUrl= process.env.REACT_APP_BASE_URL;
export const registerUserApi = async(data:registerUserDataType)=>{
    try{
        let res = await axios.post(`${baseUrl}/register`,data);
        return res;
    }catch(err){
        throw err
    }
}

export const loginUserApi = async(data:loginUserDataType)=>{
    try{
        let res = await axios.post(`${baseUrl}/token/`,data);
        return res;
    }catch(err){
       throw err
    }
}

export const updateTokenApi = async(data:string)=>{
    try{
        let res = await axios.post(`${baseUrl}/token/refresh/`,{refresh:data});
        return res;
    }catch(err){
        console.log(err)
    }
}