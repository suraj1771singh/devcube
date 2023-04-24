import axios from "axios"
import { userTokenType } from "../../dataTypes";

let baseUrl = process.env.REACT_APP_BASE_URL;
export const getUserByIdApi = async (id: number|string) => {
    let tokenAll: any = sessionStorage.getItem("authTokens");
    let authToken: userTokenType = JSON.parse(tokenAll);
    let token = authToken.access;
    try {
        let res = await axios.get(`${baseUrl}/user/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (err) {
        throw err
    }
}
export const updateUserApi = async (data: any) => {
    let tokenAll: any = sessionStorage.getItem("authTokens");
    let authToken: userTokenType = JSON.parse(tokenAll);
    let token = authToken.access;
    try {
        let res = await axios.put(`${baseUrl}/update/`,data, { headers: { Authorization: `Bearer ${token}` } })
        return res
    } catch (err) {
        throw err
    }
}

export const followUserApi = async (id: string | number) => {
    try {
        let tokenAll: any = sessionStorage.getItem("authTokens");
        let authToken: userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios({
            method: "POST",
            url: `${baseUrl}/follow/${id}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
        return res
    } catch (err) {
        throw err
    }
}

export const unfollowUserApi = async (id: string | number) => {
    try {
        let tokenAll: any = sessionStorage.getItem("authTokens");
        let authToken: userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios({
            method: "POST",
            url: `${baseUrl}/unfollow/${id}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
        return res
    } catch (err) {
        throw err
    }

}
export const getFollowersApi= async(id:string|number)=>{
    try{
        let tokenAll: any = sessionStorage.getItem("authTokens");
        let authToken: userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/followers/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        return res
    }catch(err){
        throw err
    }
}
export const getFollowingApi= async(id:string|number)=>{
    try{
        let tokenAll: any = sessionStorage.getItem("authTokens");
        let authToken: userTokenType = JSON.parse(tokenAll);
        let token = authToken.access;
        let res = await axios.get(`${baseUrl}/following/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        return res
    }catch(err){
        throw err
    }
}
let cloudName = process.env.REACT_APP_CLOUDNAME;
let preset = process.env.REACT_APP_PRESET;
export const updateUserProfileApi = async(data:any)=>{
    try {
        let imgData = new FormData()
        imgData.append("file",data)
        if(cloudName&&preset){
            imgData.append("upload_preset",preset);
            imgData.append("cloud_name",cloudName)
            let res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, imgData)
            return res
        }else{
            throw cloudName
        }
    } catch (err) {
        throw err
    }
}