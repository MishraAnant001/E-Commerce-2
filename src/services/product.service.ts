import mongoose from "mongoose";
import { IProduct } from "../interfaces";
import { Product, Store } from "../models";
import { ParsedQs } from 'qs'
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes,dynamicSearchandFilter,dynamicSort,fetchSuccess,registerSuccess,invalidMongoId,notFound,updateSuccess,deleteSuccess } from "../utils";
export class ProductService{
    async getAllProducts(filters:ParsedQs) {
        let { search, sort, minPrice, maxPrice, category } = filters
        const filterArray:any=[];
        if(category){
            filterArray.push(
                {
                    "category.name":category
                }
            )
        }
        const data = await Product.aggregate([
            {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "_id",
                  as: "category"
                }
              },
              {
                $match:dynamicSearchandFilter(['name','description','category.name'],search,maxPrice,minPrice,filterArray)
              },
              {
                $sort:dynamicSort(sort as string)
              },
              {
                $addFields:{
                    availability:{
                        $cond:{
                            if:{
                                $eq:["$status",true]
                            },
                            then:"available",
                            else:"currently not available!"
                        }
                    }
                }
              },
              {
                $project: {
                  name:1,
                  price:1,
                  category:{$first:["$category.name"]},
                  description:1,
                  stock:1,
                  availability:1
                }
              }
        ])
        if (data.length==0) {
            throw new ApiError(ErrorCodes.notFound, notFound("product"))
        }
        // const query = buildQuery(filters)
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("products"));
    }


    async createProduct( productdata: IProduct) {
        const data = await Product.create(productdata)
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data, registerSuccess("product"))
    }

    async getProduct(sellerid: string) {
        const stores = await Store.find({
            sellerid:sellerid
        })
        if (stores.length==0) {
            throw new ApiError(ErrorCodes.notFound,notFound("store"))
        }

        const storesids = stores.map((item)=>{
            return item._id
        })
        // console.log(storesids)
        const data = await Product.find({ storeid: { $in: storesids } })
        // const data = await Product.find({}).select("name price category stock");
        if (data.length==0) {
            throw new ApiError(ErrorCodes.notFound, notFound("product"))
        }
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("products"));
    }

    async updateProduct(id: string, productdata: IProduct) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, invalidMongoId("product"))
        }
        const data = Product.findByIdAndUpdate(id,productdata);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,notFound("product"))
        }
        return new ApiResponse(SuccessCodes.ok, data,updateSuccess("product"));

    }
    async deleteProduct(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("product"))
        }
        const data = Product.findByIdAndDelete(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,notFound("product"))
        }
        return new ApiResponse(SuccessCodes.ok, data, deleteSuccess("product"));
    }
    
}

