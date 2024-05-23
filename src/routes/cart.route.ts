import { Router } from "express";
import { Authentication } from "../middlewares/jwtauth.middleware";
import { CartController } from "../controllers";
const auth = new Authentication()
const controller = new CartController()
export const cartRouter:Router = Router()
cartRouter.use(auth.authenticateUser)
cartRouter.route("/").get(controller.getCart).post(controller.addCartProduct).delete(controller.deleteProduct).put(controller.updateCartProduct)
