
export interface registerUserDataType {
    first_name: string;
    email: string;
    password1: string;
    password2?: string;
}
export interface loginUserDataType {
    email: string;
    password: string;
}
export interface loggedinUserType {
    bio: string | null,
    date_joined: string,
    email: string,
    first_name: string,
    following: number[],
    groups: any[],
    id: number | string,
    insta_url: string | null,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    last_name: string | null
    linkedin_url: string | null,
    photo: string | null,
    twitter_url: string | null
    user_permissions: string[]
    username: string
}
export interface authUserDataType {
    login_loading: boolean,
    login_error: boolean,
    isAuth: boolean,
    signup_loading: boolean,
    signup_error: boolean,
    signup_success: boolean,
    myData: loggedinUserType | null,
    logout_loading: boolean,
    logout_error: boolean,
    myId: string | number | null
}
export interface userTokenType {
    access: string,
    refresh: string;
}
export interface userDataType {
    name: string,
    email: string;
    token: string;
}

export interface createRoomDataType {
    topic: (number | string)[];
    name: string;
    description: string;
}

export interface topicDataType {
    id: number | string;
    name: string
}
export interface jwtTokenType {
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
    user_id: string,
    username: string
}

export interface topicDataInitialDatatype {
    get_topics_loading: boolean;
    get_topics_error: boolean;
    allTopics: topicDataType[];
    topicTags: topicDataType[];
}

export interface roomParticipantsDataType {
    id: string | number,
    email: string
}
export interface roomHostDataType {
    email: string,
    first_name: string,
    last_name: string,
    id: string | number,
    photo?: string
}

export interface topictype{
name:string;
id:number
}

export interface roomDataDataType {
    created: string,
    description: string,
    host: roomHostDataType,
    id: string | number,
    name: string,
    participants: roomParticipantsDataType[],
    topic: topictype[],
    updated: string
}

// room reducer initial data type 
export interface roomInitialDataType {
    search_loading: boolean,
    get_user_rooms_loading: boolean,
    get_user_rooms_error: boolean,
    get_user_joined_rooms_loading: boolean,
    get_user_joined_rooms_error: boolean,
    search_error: boolean,
    allRooms: roomDataDataType[],
    allRoomsLength: number,
    userRooms: roomDataDataType[],
    create_loading?: boolean,
    create_error?: boolean,
    create_success?: boolean,

    get_loading?: boolean,
    get_error?: boolean,
    get_success?: boolean,


    update_loading?: boolean,
    update_error?: boolean,
    update_success?: boolean,

    delete_loading?: boolean,
    delete_error?: boolean,
    delete_success?: boolean,

    get_joined_loading?: boolean,
    get_joined_error?: boolean,
    get_joined_success?: boolean,

    leave_loading?: boolean,
    leave_error?: boolean,
    leave_success?: boolean,

    join_error?: boolean,
    join_loading?: boolean,
    join_success?: boolean,

    get_room_by_id_loading?: boolean,
    get_room_by_id_error?: boolean,
    get_room_by_id_success?: boolean,
    roomData: roomDataDataType | null
}

export interface commentRoomType {
    id: number,
    name: string;
}
export interface commentUserType {
    email: string;
    first_name: string;
    last_name: string;
    photo: string;
    id: number;
}
export interface commentDataDataType {
    body: string;
    created: string;
    height: number;
    id: number|string;
    is_liked: boolean;
    like_count: number;
    parent: number | null
    replies?:any;
    room: commentRoomType;
    updated: string;
    user: commentUserType
}

export interface userProfileDataType{
bio:string;
date_joined:string;
email:string; 
first_name:string;
following:number[]
groups?:number[]
id:number;
insta_url?:string|null;
is_active:boolean;
is_staff:boolean
is_superuser:boolean;
last_name:string;
linkedin_url?:string|null;
photo:string;
twitter_url?:string|null;
user_permissions?:string[]
username:string;
}