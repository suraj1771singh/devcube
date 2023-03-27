import{GET_TOPICS_LOADING,
    GET_TOPICS_SUCCESS,
    GET_TOPICS_ERROR,} from "./topic.actions.type"
import { getTopicsApi } from "./topics.api"

export const getTopics = ()=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    dispatch({type:GET_TOPICS_LOADING})
    try{
        let res = await getTopicsApi()
        dispatch({type:GET_TOPICS_SUCCESS,payload:res.data})

    }catch(err){
        dispatch({type:GET_TOPICS_ERROR})
    }
}