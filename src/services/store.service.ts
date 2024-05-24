import mongoose from "mongoose";
import { IStore } from "../interfaces";
import { Store } from "../models";
import { ApiError, ApiResponse, ErrorCodes, SuccessCodes,fetchSuccess,registerSuccess,invalidMongoId,notFound,updateSuccess,deleteSuccess, unauthorized  } from "../utils";

export class StoreService {
    async getAllStores() {
        const data =  await Store.find({}).select("name address");
        // console.log(data)
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("stores"));
    }

    async createStore(id: string, storedata: IStore) {
        let { name, address } = storedata
        const data = await Store.create({
            name: name,
            address: address,
            sellerid: id
        })
        // console.log(data)
        return new ApiResponse(SuccessCodes.created, data, registerSuccess("store"))
    }

    async getStore(id: string) {
        const data = await Store.find({
            sellerid: id
        }).select("name address")
        if (data.length==0) {
            throw new ApiError(ErrorCodes.notFound, notFound("store"))
        }
        return new ApiResponse(SuccessCodes.ok, data,  fetchSuccess("stores"));
    }

    async updateStore(id: string, sellerid: string, storedata: IStore) {
        let { name, address } = storedata
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest,invalidMongoId("store"))
        }
        const data: any = await Store.findById(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFound("store"))
        }
        console.log(data)
        console.log(sellerid)
        if (data.sellerid == sellerid) {
            data.name = name;
            data.address = address;
            await data.save()
        } else {
            throw new ApiError(ErrorCodes.unauthorized, unauthorized)
        }
        return new ApiResponse(SuccessCodes.ok, data, updateSuccess("store"));

    }

    async deleteStorebySeller(id: string, sellerid: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, invalidMongoId("store"))
        }
        const data: any = await Store.findById(id);
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,notFound("store"))
        }
        if (data.sellerid == sellerid) {
             await Store.findByIdAndDelete(id)
        } else {
            throw new ApiError(ErrorCodes.unauthorized, unauthorized)
        }
        return new ApiResponse(SuccessCodes.ok, data,deleteSuccess("store"));

    }

    async deleteStorebyAdmin(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, invalidMongoId("store"))
        }
        const data =  await Store.findByIdAndDelete(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound,notFound("store"))
        }
        return new ApiResponse(SuccessCodes.ok, data, deleteSuccess("store"));

    }
}