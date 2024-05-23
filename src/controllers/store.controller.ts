import { StoreService } from "../services";
import { Request, Response } from "express";
import { IStore, NewRequest } from "../interfaces";
import { ApiError, ErrorCodes } from "../utils";
const service = new StoreService()
export class StoreController {
    async getAllStores(req: Request, res: Response) {
        try {
            const response = await service.getAllStores();
            res.status(response.statusCode).json(response)
        } catch (error: any) {
            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while getting all stores! : ${error.message}` })
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

            res.status(ErrorCodes.internalServerError).json({ success: false, message: `Error while registering the store! : ${error.message}` })
        }
    }

    async getStore(req: NewRequest, res: Response) {
        try {
            const response = await service.getStore(req.user!.userid)
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ success: false,message: error.message })
            } else {
                res.status(ErrorCodes.internalServerError).json({ success: false,message: `Error while getting the stores : ${error.message}` })
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
                res.status(error.statusCode).json({ success: false,message: error.message })
            } else {
                res.status(500).json({ success: false,message: `Error while updating the user! : ${error.message}` })
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
                res.status(error.statusCode).json({ success: false,message: error.message })
            } else {
                res.status(500).json({ success: false,message: `Error while deleting the store! : ${error.message}` })
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
                res.status(error.statusCode).json({ success: false,message: error.message })
            } else {
                res.status(500).json({ success: false,message: `Error while deleting the store! : ${error.message}` })
            }
        }
    }
}