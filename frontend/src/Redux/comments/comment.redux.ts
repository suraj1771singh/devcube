import {
    GET_RECENT_COMMENTS_LOADING,
    GET_RECENT_COMMENTS_SUCCESS,
    GET_RECENT_COMMENTS_ERROR,
    GET_ROOM_COMMENTS_LOADING,
    GET_ROOM_COMMENTS_SUCCESS,
    GET_ROOM_COMMENTS_ERROR,
    GET_USER_COMMENTS_LOADING,
    GET_USER_COMMENTS_SUCCESS,
    GET_USER_COMMENTS_ERROR,
    CREATE_COMMENTS_LOADING,
    CREATE_COMMENTS_SUCCESS,
    CREATE_COMMENTS_ERROR,
    UPDATE_COMMENTS_LOADING,
    UPDATE_COMMENTS_SUCCESS,
    UPDATE_COMMENTS_ERROR,
    DELETE_COMMENTS_LOADING,
    DELETE_COMMENTS_SUCCESS,
    DELETE_COMMENTS_ERROR,
} from './comments.action.types'
const initialComments = {
    get_recent_comments_loading: false,
    get_recent_comments_error: false,
    get_recent_comments_success: false,
    get_rooms_comments_loading: false,
    get_rooms_comments_error: false,
    get_rooms_comments_success: false,
    get_user_comments_loading: false,
    get_user_comments_error: false,
    get_user_comments_success: false,
    create_comment_loading: false,
    create_comment_error: false,
    create_comment_success: false,
    update_comment_loading: false,
    update_comment_error: false,
    update_comment_success: false,
    delete_comment_loading: false,
    delete_comment_error: false,
    delete_comment_success: false,
    recentComments: [],
    roomComments: [],
    usersComments: []
}

export const commentReducer = (state = initialComments, { type, payload }: { type: string, payload?: any }) => {
    switch (type) {
        case GET_RECENT_COMMENTS_LOADING: {
            return {
                ...state, get_recent_comments_loading: true,
                get_recent_comments_error: false,
                get_recent_comments_success: false,
            }
        }
        case GET_RECENT_COMMENTS_SUCCESS: {
            return {
                ...state, get_recent_comments_loading: false,
                get_recent_comments_error: false,
                get_recent_comments_success: true,
                recentComments: payload
            }
        }
        case GET_RECENT_COMMENTS_ERROR: {
            return {
                ...state, get_recent_comments_loading: false,
                get_recent_comments_error: true,
                get_recent_comments_success: false,
            }
        }
        case GET_ROOM_COMMENTS_LOADING: {
            return {
                ...state, get_rooms_comments_loading: true,
                get_rooms_comments_error: false,
                get_rooms_comments_success: false,
            }
        }
        case GET_ROOM_COMMENTS_SUCCESS: {
            return {
                ...state, get_rooms_comments_loading: false,
                get_rooms_comments_error: false,
                get_rooms_comments_success: true,
                roomComments:payload
            }
        }
        case GET_ROOM_COMMENTS_ERROR: {
            return {
                ...state, get_rooms_comments_loading: false,
                get_rooms_comments_error: true,
                get_rooms_comments_success: false,
            }
        }
        case GET_USER_COMMENTS_LOADING: {
            return {
                ...state, get_user_comments_loading: true,
                get_user_comments_error: false,
                get_user_comments_success: false,
            }
        }
        case GET_USER_COMMENTS_SUCCESS: {
            return {
                ...state, get_user_comments_loading: false,
                get_user_comments_error: false,
                get_user_comments_success: true,
                usersComments:payload
            }
        }
        case GET_USER_COMMENTS_ERROR: {
            return {
                ...state, get_user_comments_loading: false,
                get_user_comments_error: true,
                get_user_comments_success: false,
            }
        }
        case CREATE_COMMENTS_LOADING: {
            return {
                ...state, create_comment_loading: true,
                create_comment_error: false,
                create_comment_success: false,
            }
        }
        case CREATE_COMMENTS_SUCCESS: {
            return {
                ...state, create_comment_loading: false,
                create_comment_error: false,
                create_comment_success: true,
            }
        }
        case CREATE_COMMENTS_ERROR: {
            return {
                ...state, create_comment_loading: false,
                create_comment_error: true,
                create_comment_success: false,
            }
        }
        case UPDATE_COMMENTS_LOADING: {
            return {
                ...state, update_comment_loading: true,
                update_comment_error: false,
                update_comment_success: false,
            }
        }
        case UPDATE_COMMENTS_SUCCESS: {
            return {
                ...state, update_comment_loading: false,
                update_comment_error: false,
                update_comment_success: true,
            }
        }
        case UPDATE_COMMENTS_ERROR: {
            return {
                ...state, update_comment_loading: false,
                update_comment_error: true,
                update_comment_success: false,
            }
        }
        case DELETE_COMMENTS_LOADING: {
            return {
                ...state, delete_comment_loading: true,
                delete_comment_error: false,
                delete_comment_success: false,
            }
        }
        case DELETE_COMMENTS_SUCCESS: {
            return {
                ...state, delete_comment_loading: false,
                delete_comment_error: false,
                delete_comment_success: true,
            }
        }
        case DELETE_COMMENTS_ERROR: {
            return {
                ...state, delete_comment_loading: false,
                delete_comment_error: true,
                delete_comment_success: false,
            }
        }
        default: {
            return { ...state }
        }
    }
}