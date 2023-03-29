import{
    CREATE_ROOM_LOADING,
CREATE_ROOM_SUCCESS,
CREATE_ROOM_ERROR,
UPDATE_ROOM_LOADING,
UPDATE_ROOM_SUCCESS,
UPDATE_ROOM_ERROR,
DELETE_ROOM_LOADING,
DELETE_ROOM_ERROR,
DELETE_ROOM_SUCCESS,
GET_ROOM_LOADING,
GET_ROOM_ERROR,
GET_ROOM_SUCCESS,
GET_ROOM_BY_USER_LOADING,
GET_ROOM_BY_USER_ERROR,
GET_ROOM_BY_USER_SUCCESS,
}from "./room.action.type";
let initialData = {
    create_loading:false,
    create_error:false,
    create_success:false,
    update_loading:false,
    update_error:false,
    update_success:false,
    get_loading:false,
    get_error:false,
    get_success:false,
    allRooms:[],
    delete_loading:false,
    delete_error:false,
    delete_success:false
}

export const roomReducer = (state=initialData,actions: { type:string; payload: any; })=>{
    const {type, payload} = actions;
    switch (type) {
    case CREATE_ROOM_LOADING:{
        return {...state, create_loading:true }
        }
    case CREATE_ROOM_SUCCESS:{
        return {...state,create_loading:false,create_success:true} // if needed update rooms here
    }
    case CREATE_ROOM_ERROR:{
        return {...state, create_loading:false, create_success:false,create_error:true }
    }
    case UPDATE_ROOM_LOADING:{
        return {...state,update_loading:true }
    }
    case UPDATE_ROOM_SUCCESS:{
        return {...state,update_loading:false, update_success:true} // if needed, update the rooms
    }
    case UPDATE_ROOM_ERROR:{
        return {...state,update_loading:false,update_error:true}
    }
    case DELETE_ROOM_LOADING:{
        return {...state, delete_loading:true}
    }
    case DELETE_ROOM_ERROR:{
        return {...state,delete_loading:false,delete_error:true }
    }
    case DELETE_ROOM_SUCCESS:{
        return {...state,delete_loading:false,delete_error:false, delete_success:true} // if needed update the rooms here
    }
    case GET_ROOM_LOADING:{
        return {...state, get_loading:true}
    }
    case GET_ROOM_ERROR:{
        localStorage.removeItem("authTokens")
        return {...state, get_loading:false, get_error:true}
    }
    case GET_ROOM_SUCCESS:{
        return {...state, get_success:true,get_loading:false,get_error:false,allRooms:payload}
    }
    case GET_ROOM_BY_USER_LOADING:{
        return {...state}
    }
    case GET_ROOM_BY_USER_ERROR:{
        return {...state}
    }
    case GET_ROOM_BY_USER_SUCCESS:{
        return {...state,allRooms:payload}
    }
        default:
           return{...state}
    }
}