import { IUser, IUserTemp } from "../interfaces";
import { Cart, User } from "../models";
import bcrypt from "bcrypt"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes,fetchSuccess,registerSuccess,invalidMongoId,notFound,updateSuccess,deleteSuccess  } from "../utils";
import mongoose from "mongoose";

export class UserService {
    async getAllUsers() {
        const data = await User.find({}).select("username email phone role");
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data,fetchSuccess("users"));
    }

    async createUser(userdata: IUser) {

        userdata.password = await bcrypt.hash(userdata.password, 10);
        // console.log(userdata)
        const data = await User.create(userdata)
        await Cart.create({
            userid:data._id
        })
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data,registerSuccess("user"))
    }

    async getUserById(id: string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("user"))
        }
        const data = await User.findById(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFound("user"))
        }
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("user"));
     }
    async updateUser(id:string,userdata:IUserTemp) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("user"))
        }
        if(userdata.password){
            userdata.password = await bcrypt.hash(userdata.password,10);
        }
        
        const data = await User.findByIdAndUpdate(id,userdata)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFound("user"))
        }
        return new ApiResponse(SuccessCodes.ok, data, updateSuccess("user"));

     }

    async deleteUser(id:string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("user"))
        }
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFound("user"))
        }
        return new ApiResponse(SuccessCodes.ok, data,deleteSuccess("user"));
     }
}