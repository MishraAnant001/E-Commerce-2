import { IUser } from "../interfaces";
import { UserService } from "../services";
import { ErrorCodes } from "../utils";
import { Request, Response } from "express";

const service = new UserService()

export class SignupController {
    async signupUser(req: Request, res: Response) {
        try {
            const userdata: IUser = req.body;
            // console.log(req.body)
            const response = await service.createUser(userdata);
            res.status(response.statusCode).json(response)

        } catch (error: any) {

            res.status(500).json({ success: false, message: `Error while registering the user! : ${error.message}` })

        }
    }
}