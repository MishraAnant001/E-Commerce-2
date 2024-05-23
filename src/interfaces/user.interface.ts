export interface IUser {
    _id?:string,
    username:string,
    password:string,
    email:string,
    phone:string,
    role:string
}
export interface IUserTemp {
    _id?:string,
    username?:string,
    password?:string,
    email?:string,
    phone?:string,
    role?:string
}

export interface ICredential{
    username:string,
    password:string,
    role:string
}