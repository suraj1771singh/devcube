
export interface dispatchType{
    type:string;
    payload?:any
}

export interface registerUserDataType{
    name:string;
    email:string;
    password:string;
    password2:string;
}
export interface loginUserDataType{
    email:string;
    password:string;
}
