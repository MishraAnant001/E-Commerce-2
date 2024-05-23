import { Router } from "express";
import { Authentication } from "../middlewares/jwtauth.middleware";
import { OrderController } from "../controllers";
const auth = new Authentication()
const controller = new OrderController()
export const orderRouter:Router = Router()
orderRouter.use(auth.authenticateUser)
orderRouter.route("/:id").get(controller.getOrder).delete(controller.cancelOrder)
orderRouter.route("/").post(controller.placeOrder).get(controller.getAllOrder)
