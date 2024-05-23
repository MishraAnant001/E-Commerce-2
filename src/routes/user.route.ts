import { Router } from "express";
import { UserController } from "../controllers";
const controller = new UserController()
import { Authentication } from "../middlewares/jwtauth.middleware";
const auth = new Authentication()
export const userRouter = Router()
userRouter.use(auth.authenticateAdmin)
userRouter.route("/").get(controller.getAllUsers).post(controller.createUser)
userRouter.route("/:id").put(controller.updateUser).delete(controller.deleteUser).get(controller.getUserById)
