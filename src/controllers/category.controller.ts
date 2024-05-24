import { CategoryService } from "../services";
import { Request, Response } from "express";
import { ApiError, deleteError, ErrorCodes, errorResponseObject, fetchError, registerError, updateError } from "../utils";
const service = new CategoryService()
export class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const response = await service.getAllCategories();
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${fetchError("categories")}: ${error.message}`))
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const {name} = req.body
            const response = await service.createCategory(name);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${registerError("category")} : ${error.message}`))
        }
    }
    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const {name} = req.body
            const response = await service.updateCategory(id, name);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${updateError("category")} : ${error.message}`))
            }
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await service.deleteCategory(id)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${deleteError("category")} : ${error.message}`))
            }
        }
    }
}