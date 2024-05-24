import { StoreService } from "../services";
import { Request, Response } from "express";
import { IStore, NewRequest } from "../interfaces";
import { ApiError, deleteError, ErrorCodes, errorResponseObject, fetchError, registerError, updateError } from "../utils";
const service = new StoreService()
export class StoreController {
    async getAllStores(req: Request, res: Response) {
        try {
            const response = await service.getAllStores();
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${fetchError("store")} : ${error.message}`))
        }
    }

    async createStore(req: NewRequest, res: Response) {
        try {
            // const{userid} = req.user
            // console.log(req.user)
            let storedata: IStore = req.body;
            const response = await service.createStore(req.user!.userid, storedata);
            return res.status(response.statusCode).json(response)


        } catch (error: any) {

            res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${registerError("store")} : ${error.message}`))
        }
    }

    async getStore(req: NewRequest, res: Response) {
        try {
            const response = await service.getStore(req.user!.userid)
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(ErrorCodes.internalServerError).json(errorResponseObject(`${fetchError("store")} : ${error.message}`))
            }
        }
    }

    async updateStore(req: NewRequest, res: Response) {
        try {
            const { id } = req.params
            const userdata: IStore = req.body;
            const response = await service.updateStore(id,req.user!.userid, userdata);
            res.status(response.statusCode).json(response)

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(500).json(errorResponseObject(`${updateError("store")} : ${error.message}`))
            }
        }
    }
    
    async deleteStoreBySeller(req: NewRequest, res: Response) {
        try {
            const { id } = req.params
            const response = await service.deleteStorebySeller(id,req.user!.userid)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(500).json(errorResponseObject(`${deleteError("store")} : ${error.message}`))
            }
        }
    }

    
    async deleteStoreByAdmin(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await service.deleteStorebyAdmin(id)
            res.status(response.statusCode).json(response);

        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json(errorResponseObject(error.message))
            } else {
                res.status(500).json(errorResponseObject(`${deleteError("store")} : ${error.message}`))
            }
        }
    }
}