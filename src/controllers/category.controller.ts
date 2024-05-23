import { CategoryService } from "../services";
import { Request, Response } from "express";
import { ApiError, ErrorCodes } from "../utils";
const service = new CategoryService()
export class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const response = await service.getAllCategories();
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting all categories! : ${error.message}` })
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const {name} = req.body
            const response = await service.createCategory(name);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while adding the Category! : ${error.message}` })
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
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(500).json({ success: false, message: `Error while updating the category! : ${error.message}` })
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
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(500).json({ success: false, message: `Error while deleting the category! : ${error.message}` })
            }
        }
    }
}