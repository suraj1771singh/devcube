import axios from "axios";
import {loginUserDataType, registerUserDataType, userTokenType } from "../../dataTypes";

let baseUrl = process.env.REACT_APP_BASE_URL;
export const registerUserApi = async (data: registerUserDataType) => {
    try {
        let res = await axios.post(`${baseUrl}/register/`, data);
        return res;
    } catch (err) {
        throw err
    }
}

export const loginUserApi = async (data: loginUserDataType) => {
    try {
        let res = await axios.post(`${baseUrl}/token/`, data);
        return res;
    } catch (err) {
        throw err
    }
} 
export const updateTokenApi = async () => {
    try {
        let tokenAll:any = sessionStorage.getItem("authTokens");
        let authToken:userTokenType = JSON.parse(tokenAll);
        let token = authToken.refresh;
            let res = await axios.post(`${baseUrl}/token/refresh/`, { refresh: token });
            return res.data;
        } catch (err) {
            console.log('error')
        throw err
    }
}

export const getLoggedinUserProfileApi = async (id: number|string) => {
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