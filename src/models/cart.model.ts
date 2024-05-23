import mongoose from "mongoose";
import { ICart } from "../interfaces";

const cartSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
})

export const Cart = mongoose.model<ICart & mongoose.Document>("Cart",cartSchema)