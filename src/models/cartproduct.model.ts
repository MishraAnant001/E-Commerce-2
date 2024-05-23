import mongoose from "mongoose";
import { ICartProduct } from "../interfaces";

const cartProductSchema = new mongoose.Schema({
    cartid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    productquantity:{
        type:Number,
        required:true
    }
})

export const CartProduct = mongoose.model<ICartProduct & mongoose.Document>('CartProduct',cartProductSchema);