import {
   GET_USER_LOADING,
   GET_USER_SUCCESS,
   GET_USER_ERROR,
   GET_USER_NAME_LOADING,
   GET_USER_NAME_SUCCESS,
   GET_USER_NAME_ERROR,
} from "./user.actions.type"

const initialTopics = {
   get_user_loading: false,
   get_user_error: false,
   userData: {},
   username: ''
}
export const userReducer = (state = initialTopics, actions: { type: string; payload: any; }) => {
   const { type, payload } = actions;
   switch (type) {
      case GET_USER_LOADING: {
         return { ...state, get_user_loading: true, get_user_error: false }
      }
      case GET_USER_SUCCESS: {
         return { ...state, get_user_error: false, get_user_loading: false, userData: payload }
      }
      case GET_USER_ERROR: {
         return { ...state, get_user_error: true, get_user_loading: false }
      }
      case GET_USER_NAME_LOADING: {
         return { ...state }
      }
      case GET_USER_NAME_SUCCESS: {
         return { ...state, userName:payload }
      }
      case GET_USER_NAME_ERROR: {
         return { ...state }
      }
      default:
         return { ...state }
   }
}