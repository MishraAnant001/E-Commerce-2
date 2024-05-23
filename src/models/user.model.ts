import mongoose from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["user","admin","seller"],
            message:"{VALUE} is not a valid role"
        }
    }
})

export const User = mongoose.model<IUser & mongoose.Document>("User",userSchema);