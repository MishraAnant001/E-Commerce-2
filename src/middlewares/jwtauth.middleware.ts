import { NewRequest } from "../interfaces";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { adminsAllowed, adminsOrSellersAllowed, authenticationError, ErrorCodes, errorResponseObject, sellersAllowed, unauthorized, usersAllowed } from "../utils";
export class Authentication{
    async authenticateUser(req:NewRequest,res:Response,next:NextFunction){
        try {
            const {token} = req.cookies;
            if(token){
                const secretkey = process.env.SECRET_KEY || "secretkey"
                const verify:any = jwt.verify(token,secretkey);
                const{userid,type} = verify;
                if(type!="user"){
                    return res.status(ErrorCodes.unauthorized).json(errorResponseObject(usersAllowed))
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                return res.status(ErrorCodes.unauthorized).json(errorResponseObject(unauthorized))
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${authenticationError}: ${error.message}`))
        }
    }
    async authenticateSeller(req:NewRequest,res:Response,next:NextFunction){
        try {
            const {token} = req.cookies;
            if(token){
                const secretkey = process.env.SECRET_KEY || "secretkey"
                const verify:any = jwt.verify(token,secretkey);
                const{userid,type} = verify;
                if(type!="seller"){
                    return res.status(ErrorCodes.unauthorized).json(errorResponseObject(sellersAllowed))
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                res.status(ErrorCodes.unauthorized).json(errorResponseObject(unauthorized))
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${authenticationError}: ${error.message}`))
        }
    }
    async authenticateSellerOrAdmin(req:NewRequest,res:Response,next:NextFunction){
        try {
            const {token} = req.cookies;
            if(token){
                const secretkey = process.env.SECRET_KEY || "secretkey"
                const verify:any = jwt.verify(token,secretkey);
                const{userid,type} = verify;
                if(type=="seller" || type=="admin"){
                    req.user={
                        userid:userid,
                        type:type
                    }
                }else{

                    return res.status(ErrorCodes.unauthorized).json(errorResponseObject(adminsOrSellersAllowed))
                }
                
                next()
            }else{
                res.status(ErrorCodes.unauthorized).json(errorResponseObject(unauthorized))
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${authenticationError}: ${error.message}`))
        }
    }
    async authenticateAdmin(req:NewRequest,res:Response,next:NextFunction){
        try {
            const {token} = req.cookies;
            if(token){
                const secretkey = process.env.SECRET_KEY || "secretkey"
                const verify:any = jwt.verify(token,secretkey);
                const{userid,type} = verify;
                if(type!="admin"){
                    return res.status(ErrorCodes.unauthorized).json(errorResponseObject(adminsAllowed))
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                return res.status(ErrorCodes.unauthorized).json(errorResponseObject(unauthorized))
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${authenticationError}: ${error.message}`))
        }
    }
}