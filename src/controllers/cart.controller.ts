import { NewRequest } from "../interfaces";
import { CartService } from "../services";
import { Response } from "express";
import { ErrorCodes } from "../utils/Status_Code";
import { ApiError } from "../utils";

const service = new CartService();

export class CartController{
    async getCart(req:NewRequest,res:Response){
        try {
            const response = await service.getCart(req.user!.userid);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting the cart! : ${error.message}` })
        }
    }

    async addCartProduct(req:NewRequest,res:Response){
        try {
            const {productid,quantity} = req.body;
            const response = await service.addCartProduct(req.user!.userid,productid,quantity);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while updating the product! : ${error.message}` })
        }
    }
    async updateCartProduct(req:NewRequest,res:Response){
        try {
            const {productid,quantity} = req.body;
            const response = await service.updateCartProduct(req.user!.userid,productid,quantity);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while updating the product! : ${error.message}` })
            }
            
        }
    }
    async deleteProduct(req:NewRequest,res:Response){
        try {
            const {productid,quantity} = req.body;
            const response = await service.deleteProduct(req.user!.userid,productid);
            res.status(response.statusCode).json(response)
        } catch (error:any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while deleting the product! : ${error.message}` })
            }
           
        }
    }
}