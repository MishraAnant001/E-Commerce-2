import { NewRequest } from "../interfaces";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorCodes } from "../utils";
export class Authentication{
    async authenticateUser(req:NewRequest,res:Response,next:NextFunction){
        try {
            const {token} = req.cookies;
            if(token){
                const secretkey = process.env.SECRET_KEY || "secretkey"
                const verify:any = jwt.verify(token,secretkey);
                const{userid,type} = verify;
                if(type!="user"){
                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"only users are allowed !"
                    })
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                return res.status(ErrorCodes.unauthorized).json({
                    success:false,
                    message:"unauthorized access!"
                })
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while authentication : ${error.message}`
            })
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
                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"only sellers are allowed !"
                    })
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                res.status(ErrorCodes.unauthorized).json({
                    success:false,
                    message:"unauthorized access!"
                })
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while authentication : ${error.message}`
            })
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

                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"only sellers and admins are allowed !"
                    })
                }
                
                next()
            }else{
                res.status(ErrorCodes.unauthorized).json({
                    success:false,
                    message:"unauthorized access!"
                })
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while authentication : ${error.message}`
            })
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
                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"only admins are allowed !"
                    })
                }
                req.user={
                    userid:userid,
                    type:type
                }
                next()
            }else{
                return res.status(ErrorCodes.unauthorized).json({
                    success:false,
                    message:"unauthorized access!"
                })
            }
        } catch (error:any) {
            return res.status(ErrorCodes.internalServerError).json({
                success:false,
                message:`Error while authentication : ${error.message}`
            })
        }
    }
}