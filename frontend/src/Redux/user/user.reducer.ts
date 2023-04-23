import {
   GET_USER_LOADING,
   GET_USER_SUCCESS,
   GET_USER_ERROR,
   FOLLOW_USER_LOADING,
   FOLLOW_USER_SUCCESS,
   FOLLOW_USER_ERROR,
   UNFOLLOW_USER_LOADING,
   UNFOLLOW_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   UPDATE_USER_LOADING,
   UNFOLLOW_USER_ERROR,
   GET_FOLLOWERS_LOADING,
   GET_FOLLOWERS_SUCCESS,
   GET_FOLLOWERS_ERROR,
   GET_FOLLOWING_LOADING,
   GET_FOLLOWING_SUCCESS,
   GET_FOLLOWING_ERROR,
   GET_USER_NAME_LOADING,
   GET_USER_NAME_SUCCESS,
   GET_USER_NAME_ERROR,
} from "./user.actions.type"

const initialTopics = {
   get_user_loading: false,
   get_user_error: false,
   userData: {},
   username: '',
   followers:[],
   following:[],
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
         return { ...state, userName: payload }
      }
      case GET_USER_NAME_ERROR: {
         return { ...state }
      }
      case FOLLOW_USER_LOADING:{
         return {...state, }
      }
      case FOLLOW_USER_SUCCESS:{
         return {...state, }
      }
      case FOLLOW_USER_ERROR:{
         return {...state, }
      }
      case UNFOLLOW_USER_LOADING:{
         return {...state, }
      }
      case UNFOLLOW_USER_SUCCESS:{
         return {...state, }
      }
      case UPDATE_USER_SUCCESS:{
         return {...state, }
      }
      case UPDATE_USER_ERROR:{
         return {...state, }
      }
      case UPDATE_USER_LOADING:{
         return {...state, }
      }
      case UNFOLLOW_USER_ERROR:{
         return {...state, }
      }
      case GET_FOLLOWERS_LOADING:{
         return {...state, }
      }
      case GET_FOLLOWERS_SUCCESS:{
         return {...state, followers:payload}
      }
      case GET_FOLLOWERS_ERROR:{
         return {...state, }
      }
      case GET_FOLLOWING_LOADING:{
         return {...state, }
      }
      case GET_FOLLOWING_SUCCESS:{
         return {...state,following:payload}
      }
      case GET_FOLLOWING_ERROR:{
         return {...state, }
      }
      default:
         return { ...state }
   }
}