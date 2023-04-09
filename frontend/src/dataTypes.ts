
export interface dispatchType{
    type:string;
    payload?:any
}

export interface registerUserDataType{
    first_name:string;
    email:string;
    password1:string;
    password2?:string;
}
export interface loginUserDataType{
    email:string;
    password:string;
}
export interface authUserDataType{
    login_loading:boolean,
        login_error:boolean,
        isAuth:boolean,
        signup_loading:boolean,
        signup_error:boolean,
        signup_success:boolean,
        myData:any,
        logout_loading:boolean,
        logout_error:boolean,
        token?:userTokenType|null
}
export interface userTokenType {
    access:string,
    refresh:string;
}
export interface userDataType{
    name:string,
    email:string;
    token:string;
}

export interface createRoomDataType{
    topic:(number|string)[];
    name:string;
    description:string;
}

export interface topicDataType{
    id:number|string;
    name:string
}

export interface topicDataInitialDatatype {
    get_topics_loading: boolean;
    get_topics_error: boolean;
    allTopics:topicDataType[];
    topicTags:topicDataType[];
}

export interface roomParticipantsDataType{
id:string|number,
email:string
}
export interface roomHostDataType{
email:string,
first_name:string,
last_name:string,
id:string|number,
profile?:string
}

export interface roomDataDataType{
    created:string,
    description:string,
    host:roomHostDataType,
    id:string|number,
    name:string,
    participants:roomParticipantsDataType[],
    topic:number|number[],
    updated:string
}

export interface roomInitialDataType{
    allRooms: roomDataDataType[],
    create_loading?:boolean,
    create_error?:boolean,
    create_success?:boolean,
    
    get_loading?:boolean,
    get_error?:boolean,
    get_success?:boolean,

    
    update_loading?:boolean,
    update_error?:boolean,
    update_success?:boolean,
    
    delete_loading?:boolean,
    delete_error?:boolean,
    delete_success?:boolean,
    
    get_joined_loading?:boolean,
    get_joined_error?:boolean,
    get_joined_success?:boolean,
    
    leave_loading?:boolean,
    leave_error?:boolean,
    leave_success?:boolean,

    join_error?:boolean,
    join_loading?:boolean,
    join_success?:boolean,

    get_room_by_id_loading?:boolean,
    get_room_by_id_error?:boolean,
    get_room_by_id_success?:boolean,
    roomData:roomDataDataType|null
}