import mongoose from "mongoose";
import { IStore } from "../interfaces";

const storeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    sellerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    address:{
        type:String,
        required:true,
        lowercase:true
    }
})

export const Store = mongoose.model<IStore & mongoose.Document>("Store",storeSchema);