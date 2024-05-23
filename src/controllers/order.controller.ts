import { IOrderProduct, NewRequest } from "../interfaces";
import { OrderService } from "../services";
import { Response } from "express";
import { ErrorCodes } from "../utils/Status_Code";
import { ApiError } from "../utils/API_Error";

const service = new OrderService();

export class OrderController{
    async getOrder(req:NewRequest,res:Response){
        try {
            const{id}= req.params
            const response = await service.getOrder(req.user!.userid,id);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting the Order! : ${error.message}` })
            }
            
        }
    }
    async getAllOrder(req:NewRequest,res:Response){
        try {
            const response = await service.getAllOrders(req.user!.userid);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting the Order! : ${error.message}` })
            }
            
        }
    }

    async placeOrder(req:NewRequest,res:Response){
        try {
            const orderdata:IOrderProduct[] = req.body;
            const response = await service.placeOrder(req.user!.userid,orderdata);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while placing the order! : ${error.message}` })
        }
    }
    async cancelOrder(req:NewRequest,res:Response){
        try {
            const{id}= req.params
            const response = await service.cancelOrder(req.user!.userid,id);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while cancelling the order! : ${error.message}` })
            }

        }
    }
}