import{GET_USER_LOADING,
    GET_USER_SUCCESS,
    GET_USER_ERROR} from "./user.actions.type"
import { getUserByIdApi } from "./user.api"

export const getUserById = (id:number)=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    dispatch({type:GET_USER_LOADING})
    try{
        let res = await getUserByIdApi(id)
        dispatch({type:GET_USER_SUCCESS,payload:res.data})

    }catch(err){
        dispatch({type:GET_USER_ERROR})
    }
}
