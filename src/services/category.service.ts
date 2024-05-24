import { Category } from "../models";
import mongoose from "mongoose";
import { ApiError, ApiResponse, deleteSuccess, ErrorCodes, fetchSuccess, invalidMongoId, notFound, registerSuccess, SuccessCodes, updateSuccess } from "../utils";
export class CategoryService{
    async getAllCategories(){
        const data =  await Category.find({})
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("categories"));
    }

    async createCategory(category:string) {
        const data = await Category.create({
            name: category
        })
        return new ApiResponse(SuccessCodes.created, data,registerSuccess("category"))
    }

    async updateCategory(id:string,category:string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, invalidMongoId("category"))
        }
        const data = await Category.findByIdAndUpdate(id,{
            name: category
        })
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,notFound("category"))
        }
        return new ApiResponse(SuccessCodes.created, data, updateSuccess("category"))
    }

    async deleteCategory(id:string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("category"))
        }
        const data = await Category.findByIdAndDelete(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFound("category"))
        }
        return new ApiResponse(SuccessCodes.created, data,deleteSuccess("category"))
    }

}

