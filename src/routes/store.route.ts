import { Router } from "express";
import { StoreController } from "../controllers";
const controller = new StoreController()
import { Authentication } from "../middlewares/jwtauth.middleware";
const auth = new Authentication()
export const storeRouter = Router()
storeRouter.route("/").get(auth.authenticateAdmin,controller.getAllStores).post(auth.authenticateSeller,controller.createStore)
storeRouter.route("/seller").get(auth.authenticateSeller,controller.getStore);
storeRouter.route("/seller/:id").put(auth.authenticateSeller,controller.updateStore).delete(auth.authenticateSeller,controller.deleteStoreBySeller)
storeRouter.route("/:id").delete(auth.authenticateAdmin,controller.deleteStoreByAdmin)


