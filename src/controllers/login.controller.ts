import { LoginService } from "../services";
import { ApiError, ErrorCodes } from "../utils";
import { Request,Response } from "express";
const service = new LoginService()
export class LoginController{
    async loginUser(req: Request, res: Response) {
        try {
            const userdata=req.body;
            const response = await service.loginuser(userdata)
            res.cookie("token",response.data)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false,message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false,message: `Error while logging in : ${error.message}` })
            }
        }
    }
}