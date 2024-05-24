import { ProductService } from "../services";
import { Request, Response } from "express";
import { IProduct, NewRequest } from "../interfaces";
import { ApiError, deleteError, ErrorCodes, errorResponseObject, fetchError, registerError, updateError } from "../utils";
const service = new ProductService();
export class ProductController{
    async getAllproducts(req: Request, res: Response) {
        try {
            const response = await service.getAllProducts(req.query);
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(ErrorCodes.internalServerError).json(errorResponseObject( `${fetchError("products")}: ${error.message}`))
            }
            
        }
    }
    async createproduct(req: NewRequest, res: Response) {
        try {
            let productdata: IProduct = req.body;
            const response = await service.createProduct(productdata);
            return res.status(response.statusCode).json(response)
        } catch (error: any) {

            res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${registerError("product")} : ${error.message}`))
        }
    }

    async getProduct(req: NewRequest, res: Response) {
        try {
            const response = await service.getProduct(req.user!.userid)
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${fetchError("product")}: ${error.message}`))
            }
        }
    }
    async updateProduct(req: NewRequest, res: Response) {
        try {
            const { id } = req.params
            const productdata: IProduct = req.body;
            const response = await service.updateProduct(id,productdata);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(500).json(errorResponseObject(`${updateError("product")} : ${error.message}`))
            }
        }
    }
        
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await service.deleteProduct(id)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(500).json(errorResponseObject(`${deleteError("product")} : ${error.message}`))
            }
        }
    }
}
