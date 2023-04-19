import { topicDataType } from "../../dataTypes";
import{GET_TOPICS_LOADING,
    GET_TOPICS_SUCCESS,
    GET_TOPICS_ERROR,
    ADD_TOPIC_TAGS_SUCCESS,
    ADD_TOPIC_TAGS_ERROR,
    UPDATE_TOPIC_TAGS_SUCCESS,
UPDATE_TOPIC_TAGS_ERROR,
    REMOVE_TOPIC_TAGS_SUCCESS,
    REMOVE_TOPIC_TAGS_ERROR,} from "./topic.actions.type"
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

export const addTopicTag = (data:topicDataType)=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    try{
        dispatch({type:ADD_TOPIC_TAGS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:ADD_TOPIC_TAGS_ERROR})
    }
}

export const removeTopicTag = (data:topicDataType)=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    try{
        dispatch({type:REMOVE_TOPIC_TAGS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:REMOVE_TOPIC_TAGS_ERROR})
    }
}
export const updateTopicTag = (data:topicDataType[])=>async(dispatch: (arg0: { type: string; payload?: any }) => void)=>{
    try{
        dispatch({type:UPDATE_TOPIC_TAGS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:UPDATE_TOPIC_TAGS_ERROR})
    }
}

