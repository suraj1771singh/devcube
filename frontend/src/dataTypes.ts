
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
        userData:userDataType|null,
        logout_loading:boolean,
        logout_error:boolean,
}
export interface userDataType{
    name:string,
    email:string;
    token:string;
}