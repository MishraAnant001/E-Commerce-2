import { ErrorCodes } from "../utils";
import { userSignupSchema,userLoginSchema } from "../validators/validator";
import { Request,Response,NextFunction } from "express";


export class Validation{
    async validateSignup(req:Request,res:Response,next:NextFunction){
        try {
            await userSignupSchema.validate(req.body);
            next();
        } catch (error:any) {
            res.status(ErrorCodes.badRequest).json({
                success: false,
                message: error.message,
            })
        }
    }
    async validatelogin(req:Request,res:Response,next:NextFunction){
        try {
            await userLoginSchema.validate(req.body);
            next();
        } catch (error:any) {
            res.status(ErrorCodes.badRequest).json({
                success: false,
                message: error.message,
            })
        }
    }
}