import axios from "axios"
import { userTokenType } from "../../dataTypes";

let baseUrl = process.env.REACT_APP_BASE_URL;
export const getUserByIdApi = async(id:number)=>{
    let tokenAll:any = localStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
    try{    
        let res = await axios.get(`${baseUrl}/user/${id}/`,{headers:{Authorization:`Bearer ${token}`}})
        return res
    }catch(err){
throw err
    }
} 