import mongoose from "mongoose";
import { IOrderProduct } from "../interfaces";

const OrderProductSchema = new mongoose.Schema({
    orderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    productquantity: {
        type: Number,
        required: true
    }
})

export const OrderProduct = mongoose.model<IOrderProduct & mongoose.Document>('OrderProduct', OrderProductSchema);