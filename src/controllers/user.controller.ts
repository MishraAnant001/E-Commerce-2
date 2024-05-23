import { UserService } from "../services";
import { Request, Response } from "express";
import { IUser, IUserTemp } from "../interfaces";
import { ApiError, ErrorCodes } from "../utils";
const service = new UserService()
export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const response = await service.getAllUsers();
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting all users! : ${error.message}` })
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const userdata: IUser = req.body;
            // console.log(req.body)
            const response = await service.createUser(userdata);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while registering the user! : ${error.message}` })
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await service.getUserById(id)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting the user : ${error.message}` })
            }
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const userdata: IUserTemp = req.body;
            const response = await service.updateUser(id, userdata);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(500).json({ success: false, message: `Error while updating the user! : ${error.message}` })
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await service.deleteUser(id)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false, message: error.message })
            } else {
                res.status(500).json({ success: false, message: `Error while deleting the user! : ${error.message}` })
            }
        }
    }
}