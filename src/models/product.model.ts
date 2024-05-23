import mongoose from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    storeid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
        required:true
    }
})

export const Product = mongoose.model<IProduct & mongoose.Document>('Product',productSchema);