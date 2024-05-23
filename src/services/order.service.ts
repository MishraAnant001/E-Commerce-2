import mongoose from "mongoose";
import { IOrderProduct } from "../interfaces";
import { Order, OrderProduct } from "../models";
import { ApiError, ApiResponse } from "../utils";
import { ErrorCodes, SuccessCodes } from "../utils/Status_Code";

export class OrderService {
    async placeOrder(userid: string, orderdata: IOrderProduct[]) {
        const order = await Order.create({
            userid: userid
        });
        let total = 0;
        for (const item of orderdata) {
            await OrderProduct.create({
                orderid: order._id,
                productid: item.productid,
                productprice: item.productprice,
                productquantity: item.productquantity
            })
            total += item.productprice * item.productquantity;
            // console.log(total)
        }
        // console.log(total)
        order.total = total;
        await order.save()
        return new ApiResponse(SuccessCodes.ok, order, "Order placed successfully!")
    }

    async getOrder(userid: string, orderid: string) {
        if (!mongoose.isValidObjectId(orderid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid order id ")
        }
        const order = await Order.findOne({
            _id: orderid,
            userid: userid
        })

        if (!order) {
            throw new ApiError(ErrorCodes.notFound, "No order found")
        }
        else {
            const orderProducts = await OrderProduct.aggregate([
                {
                    $match: {
                        orderid: order._id
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productid",
                        foreignField: "_id",
                        as: "products"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "products.category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $addFields: {
                        subtotal: {
                            $multiply: [
                                "$productquantity",
                                {
                                    $first: ["$products.price"]
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        product: {
                            $first: ["$products.name"]
                        },
                        price: {
                            $first: ["$products.price"]
                        },
                        productquantity: 1,
                        subtotal: 1,
                        category: {
                            $first: ["$category.name"]
                        }
                    }
                }
            ])
            // const orderProducts=await OrderProduct.find({orderid:orderid})
            // console.log(orderProducts)
            const data = { orderProducts,total:order.total,iscancelled:order.iscancelled }
            return new ApiResponse(SuccessCodes.ok, data, "Order fetched successfully!")
        }


    }

    async getAllOrders(userid: string) {
        const order = await Order.find({
            userid: userid
        })
        if (!order) {
            throw new ApiError(ErrorCodes.notFound, "No order found")
        }
        return new ApiResponse(SuccessCodes.ok, order, "Orders fetched successfully!")
    }

    async cancelOrder(userid: string, orderid: string) {
        if (!mongoose.isValidObjectId(orderid)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid order id ")
        }
        const order = await Order.findByIdAndUpdate(orderid, {
            iscancelled: true
        })
        if (!order) {
            throw new ApiError(ErrorCodes.notFound, "No order found")
        }
        return new ApiResponse(SuccessCodes.ok, order, "Order cancelled successfully!")
    }
}