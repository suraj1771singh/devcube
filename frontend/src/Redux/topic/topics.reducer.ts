import{GET_TOPICS_LOADING,
    GET_TOPICS_SUCCESS,
    GET_TOPICS_ERROR,} from "./topic.actions.type"


    const initialTopics ={
        get_topics_loading:false,
        get_topics_error:false,
        allTopics:[]
    }
    export const topicsReducer = (state=initialTopics,actions: { type: string; payload: any; })=>{
        const {type,payload} = actions;
        switch (type) {
            case GET_TOPICS_LOADING:{
                return {...state,loading:true,error:false}
             }
             case GET_TOPICS_SUCCESS:{
                return{ ...state,error:false,loading:false,allTopics:payload}
             }
             case GET_TOPICS_ERROR:{
                return{...state,error:true,loading:false}
             }
            default:
               return{...state}
        }
    }