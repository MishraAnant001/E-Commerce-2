import { Router } from "express";
import { ProductController } from "../controllers";
const controller = new ProductController()
import { Authentication } from "../middlewares/jwtauth.middleware";
const auth = new Authentication()
export const productRouter = Router()
// productRouter.use(auth.authenticateAdmin)
productRouter.route("/?").get(controller.getAllproducts)
productRouter.route("/").post(auth.authenticateSeller,controller.createproduct)
productRouter.route("/seller").get(auth.authenticateSeller,controller.getProduct)
productRouter.route("/:id").put(auth.authenticateSeller,controller.updateProduct).delete(auth.authenticateSellerOrAdmin,controller.deleteProduct)