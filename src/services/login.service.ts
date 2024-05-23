import { ICredential } from "../interfaces";
import { User } from "../models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";

export class LoginService{
    async loginuser(userdata:ICredential){
        const{username,password}= userdata;
        const data = await User.findOne({username:username});
        if(!data){
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        const verify = await bcrypt.compare(password,data.password);
        if(!verify){
            throw new ApiError(ErrorCodes.unauthorized, "Invalid password!")
        }
        const secretkey = process.env.SECRET_KEY || "secretkey"
        const response = jwt.sign({
            userid:data._id,
            type:data.role
        },secretkey,{
            expiresIn:"24h"
        })
        return new ApiResponse(SuccessCodes.ok,response,"user login successfull!")
    }
}