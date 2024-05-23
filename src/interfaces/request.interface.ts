import { Request } from "express";
export interface NewRequest extends Request{
    user?:{
        userid:string,
        type:string
    }
}