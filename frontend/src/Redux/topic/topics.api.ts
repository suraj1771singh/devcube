import axios from "axios"

let baseUrl = process.env.REACT_APP_BASE_URL;
export const getTopicsApi = async()=>{
    try{    
        let res = await axios.get(`${baseUrl}/topics/`)
        return res;
    }catch(err){
throw err
    }
}