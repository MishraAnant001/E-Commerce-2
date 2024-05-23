import { Router } from "express";
import { CategoryController } from "../controllers";
const controller = new CategoryController()
import { Authentication } from "../middlewares/jwtauth.middleware";
const auth = new Authentication()
export const categoryRouter = Router()
categoryRouter.route("/").get(controller.getAllCategories).post(auth.authenticateAdmin,controller.createCategory)
categoryRouter.route("/:id").put(auth.authenticateAdmin,controller.updateCategory).delete(auth.authenticateAdmin,controller.deleteCategory)
