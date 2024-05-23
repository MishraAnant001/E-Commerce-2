import { IUser, IUserTemp } from "../interfaces";
import { Cart, User } from "../models";
import bcrypt from "bcrypt"
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";
import mongoose from "mongoose";

export class UserService {
    async getAllUsers() {
        const data = await User.find({}).select("username email phone role");
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, "Users fetched successfully");
    }

    async createUser(userdata: IUser) {

        userdata.password = await bcrypt.hash(userdata.password, 10);
        // console.log(userdata)
        const data = await User.create(userdata)
        await Cart.create({
            userid:data._id
        })
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data,"User registered successfully")
    }

    async getUserById(id: string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        const data = await User.findById(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User fetched successfully");
     }
    async updateUser(id:string,userdata:IUserTemp) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        if(userdata.password){
            userdata.password = await bcrypt.hash(userdata.password,10);
        }
        
        const data = await User.findByIdAndUpdate(id,userdata)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User updated successfully");

     }

    async deleteUser(id:string) {
        if(!mongoose.isValidObjectId(id)){
            throw new ApiError(ErrorCodes.badRequest,"Please provide valid user id ")
        }
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No User found")
        }
        return new ApiResponse(SuccessCodes.ok, data, "User deleted successfully");
     }
}