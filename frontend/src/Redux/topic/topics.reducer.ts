import { topicDataInitialDatatype, topicDataType } from "../../dataTypes";
import{GET_TOPICS_LOADING,
    GET_TOPICS_SUCCESS,
    GET_TOPICS_ERROR,
    ADD_TOPIC_TAGS_SUCCESS,
    ADD_TOPIC_TAGS_ERROR,
    REMOVE_TOPIC_TAGS_SUCCESS,
    UPDATE_TOPIC_TAGS_SUCCESS,
UPDATE_TOPIC_TAGS_ERROR,
    REMOVE_TOPIC_TAGS_ERROR,
    RESET_TOPIC_TAGS_ERROR,
    RESET_TOPIC_TAGS_SUCCESS,} from "./topic.actions.type"


const initialTopics:topicDataInitialDatatype = {
    get_topics_loading: false,
    get_topics_error: false,
    allTopics:[],
    topicTags: []
}
export const topicsReducer = (state = initialTopics, actions: { type: string; payload: any; }) => {
    const { type, payload } = actions;
    switch (type) {
        case GET_TOPICS_LOADING: {
            return { ...state, loading: true, error: false }
        }
        case GET_TOPICS_SUCCESS: {
            return { ...state, error: false, loading: false, allTopics: payload }
        }
        case GET_TOPICS_ERROR: {
            return { ...state, error: true, loading: false }
        }
        case ADD_TOPIC_TAGS_SUCCESS: {
            // eslint-disable-next-line array-callback-return
            let exist = state.topicTags.filter((el:topicDataType)=>{
                if(el.id===payload.id){
                    return el
                }
            })
            if(exist.length===0&&state.topicTags.length<5){
                return { ...state,topicTags:[...state.topicTags,payload] }
            }else{
                return{...state,}
            }
        }
        case ADD_TOPIC_TAGS_ERROR: {
            return{...state}
        }
        case REMOVE_TOPIC_TAGS_ERROR: {
            return{...state}
        }
        case REMOVE_TOPIC_TAGS_SUCCESS: {

            // eslint-disable-next-line array-callback-return
            let updateTopicTags = state.topicTags?.filter((el:topicDataType)=>{
                if(el.id!==payload.id){
                    return el
                }
            })
            return { ...state,topicTags:updateTopicTags}
        }
        case UPDATE_TOPIC_TAGS_SUCCESS:{
            return{...state,topicTags:payload}
        }
case UPDATE_TOPIC_TAGS_ERROR:{
    return{...state}
}
case RESET_TOPIC_TAGS_ERROR:{
    return {...state}
}
case RESET_TOPIC_TAGS_SUCCESS:{
    return {...state,topicTags:[]}
}
        default:
            return { ...state }
    }
}