import { Category } from "../models";
import mongoose from "mongoose";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes } from "../utils";
export class CategoryService{
    async getAllCategories(){
        const data =  await Category.find({})
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, "categories fetched successfully");
    }

    async createCategory(category:string) {
        const data = await Category.create({
            name: category
        })
        return new ApiResponse(SuccessCodes.created, data, "Category added successfully")
    }

    async updateCategory(id:string,category:string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid category id ")
        }
        const data = await Category.findByIdAndUpdate(id,{
            name: category
        })
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No category found")
        }
        return new ApiResponse(SuccessCodes.created, data, "Category updated successfully")
    }

    async deleteCategory(id:string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid category id ")
        }
        const data = await Category.findByIdAndDelete(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No category found")
        }
        return new ApiResponse(SuccessCodes.created, data, "Category deleted successfully")
    }

}

