import { Router } from "express";
import { LoginController } from "../controllers";
import { Validation } from "../middlewares/validation.middleware";
const controller = new LoginController()
export const loginRouter = Router()
const valiadate = new Validation()

loginRouter.route("/").post(valiadate.validatelogin,controller.loginUser)
