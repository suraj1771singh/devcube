import { roomInitialDataType } from "../../dataTypes";
import {
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
    JOIN_ROOM_LOADING,
    JOIN_ROOM_ERROR,
    JOIN_ROOM_SUCCESS,
    LEAVE_ROOM_LOADING,
    LEAVE_ROOM_ERROR,
    LEAVE_ROOM_SUCCESS,
    GET_ROOM_BY_ID_LOADING,
    GET_ROOM_BY_ID_ERROR,
    GET_ROOM_BY_ID_SUCCESS, GET_ROOMS_JOINED_BY_USER_LOADING,
    GET_ROOMS_JOINED_BY_USER_ERROR,
    GET_ROOMS_JOINED_BY_USER_SUCCESS,
    GET_ROOMS_BY_TOPICS_LOADING,
    GET_ROOMS_BY_TOPICS_ERROR,
    GET_ROOMS_BY_TOPICS_SUCCESS,
    GET_ROOMS_BY_SEARCH_LOADING,
    GET_ROOMS_BY_SEARCH_ERROR,
    GET_ROOMS_BY_SEARCH_SUCCESS,
    RESET_CREATE_ROOM_DATA,
    RESET_UPDATE_ROOM_DATA
} from "./room.action.type";
let initialData: roomInitialDataType = {
    search_loading: false,
    search_error: false,

    allRooms: [],
    allRoomsLength: 0,

    get_user_rooms_loading:false,
    userRooms: [],
    get_user_rooms_error:false,

    get_user_joined_rooms_loading:false,
    get_user_joined_rooms_error:false,

    create_loading: false,
    create_error: false,
    create_success: false,

    get_loading: false,
    get_error: false,
    get_success: false,


    update_loading: false,
    update_error: false,
    update_success: false,

    delete_loading: false,
    delete_error: false,
    delete_success: false,

    get_joined_loading: false,
    get_joined_error: false,
    get_joined_success: false,

    leave_loading: false,
    leave_error: false,
    leave_success: false,

    join_error: false,
    join_loading: false,
    join_success: false,

    get_room_by_id_loading: false,
    get_room_by_id_error: false,
    roomData: null
}

export const roomReducer = (state = initialData, actions: { type: string; payload: any; }) => {
    const { type, payload } = actions;
    switch (type) {
        case CREATE_ROOM_LOADING: {
            return { ...state, create_loading: true,
                create_error: false,
                create_success: false, }
        }
        case CREATE_ROOM_SUCCESS: {
            return { ...state, create_loading: false,
                create_error: false,
                create_success: true}
        }
        case CREATE_ROOM_ERROR: {
            return { ...state, create_loading: false,
                create_error: true,
                create_success: false, }
        }
        case RESET_CREATE_ROOM_DATA:{
           return {...state, create_loading: false,
                create_error: false,
                create_success: false, }
        }
        case UPDATE_ROOM_LOADING: {
            return { ...state, update_loading: true,update_error:false,update_success:false }
        }
        case UPDATE_ROOM_SUCCESS: {
            return { ...state, update_loading: false, update_success: true,update_error:false}
        }
        case UPDATE_ROOM_ERROR: {
            return { ...state, update_loading: false, update_error: true,update_success:false}
        }
        case DELETE_ROOM_LOADING: {
            return { ...state, delete_loading: true }
        }
        case DELETE_ROOM_ERROR: {
            return { ...state, delete_loading: false, delete_error: true }
        }
        case DELETE_ROOM_SUCCESS: {
            // eslint-disable-next-line array-callback-return
            let newRooms = state.allRooms.filter((el: any) => {
                if (el.id !== payload) {
                    return el
                }
            })
            return { ...state, delete_loading: false, delete_error: false, delete_success: true, allRooms: newRooms } // if needed update the rooms here
        }
        case GET_ROOM_LOADING: {
            return { ...state, get_loading: true, get_error: false }
        }
        case GET_ROOM_ERROR: {
            return { ...state, get_loading: false, get_error: true }
        }
        case GET_ROOM_SUCCESS: {
            return { ...state, get_success: true, get_loading:false, get_error: false, allRooms: payload.rooms, allRoomsLength: payload.rooms_count }
        }
        case GET_ROOM_BY_USER_LOADING: {
            return { ...state,get_user_rooms_loading:true,
                get_user_rooms_error:false}
        }
        case GET_ROOM_BY_USER_ERROR: {
            return { ...state,get_user_rooms_loading:false,
                get_user_rooms_error:true}
        }
        case GET_ROOM_BY_USER_SUCCESS: {
            return { ...state, userRooms: payload.rooms,get_user_rooms_loading:false,
    get_user_rooms_error:false}
        }
        case JOIN_ROOM_LOADING: {
            return { ...state, join_error: false, join_loading: true, join_success: false, }
        }
        case JOIN_ROOM_ERROR: {
            return { ...state, join_error: true, join_loading: false, join_success: false, }
        }
        case JOIN_ROOM_SUCCESS: {
            // eslint-disable-next-line array-callback-return
            let addParticipantArray = state.allRooms?.map((el) => {
                if (el.id === payload.id) {
                    el.participants.push(payload.user)
                }
                return el
            })
            if (state.roomData) {
                state.roomData.participants.push(payload.user)
            }
            return { ...state, join_error: false, join_loading: false, join_success: true, allRooms: addParticipantArray }
        }
        case LEAVE_ROOM_LOADING: {
            return { ...state, leave_loading: true, leave_error: false, leave_success: false, }
        }
        case LEAVE_ROOM_ERROR: {
            return { ...state, leave_loading: false, leave_error: true, leave_success: false, }
        }
        case LEAVE_ROOM_SUCCESS: {
            if (state.roomData) {
                // eslint-disable-next-line array-callback-return
                let updatedParticipants = state.roomData.participants.filter((el) => {
                    if (el.id !== payload.user.id) {
                        return el
                    }
                })
                state.roomData.participants = updatedParticipants;
            }
            return { ...state, leave_loading: false, leave_error: false, leave_success: true, }
        }
        case GET_ROOM_BY_ID_LOADING: {
            return {
                ...state, get_room_by_id_loading: true,
                get_room_by_id_error: false,
            }
        }
        case GET_ROOM_BY_ID_ERROR: {
            return {
                ...state, get_room_by_id_loading: false,
                get_room_by_id_error: true,
            }
        }
        case GET_ROOM_BY_ID_SUCCESS: {
            return {
                ...state, get_room_by_id_loading: false,
                get_room_by_id_error: false, 
                roomData: payload
            }
        }
        case GET_ROOMS_JOINED_BY_USER_LOADING: {
            return { ...state,get_user_joined_rooms_loading:true,
                get_user_joined_rooms_error:false, }
        }
        case GET_ROOMS_JOINED_BY_USER_ERROR: {
            return { ...state,get_user_joined_rooms_loading:false,
                get_user_joined_rooms_error:true, }
        }
        case GET_ROOMS_JOINED_BY_USER_SUCCESS: {
            return { ...state, userRooms: payload,get_user_joined_rooms_loading:false,
                get_user_joined_rooms_error:false, }
        }
        case GET_ROOMS_BY_TOPICS_LOADING: {
            return { ...state }
        }
        case GET_ROOMS_BY_TOPICS_ERROR: {
            return { ...state }
        }
        case GET_ROOMS_BY_TOPICS_SUCCESS: {
            return { ...state, allRooms: payload.rooms, allRoomsLength: payload.rooms_count }
        }
        case GET_ROOMS_BY_SEARCH_LOADING:{
            return {...state,search_loading: true,
                search_error: false,}
        }
    case GET_ROOMS_BY_SEARCH_ERROR:{
        return {...state,search_loading: false,
            search_error: true,}
    }
    case GET_ROOMS_BY_SEARCH_SUCCESS:{
        return {...state, allRooms: payload.rooms,
            allRoomsLength: payload.rooms_count,search_loading: false,
            search_error: false,}
    }
    case RESET_UPDATE_ROOM_DATA:{
        return{...state, update_loading: false,
            update_error: false,
            update_success: false}
    }
        default:
            return { ...state }
    }
}