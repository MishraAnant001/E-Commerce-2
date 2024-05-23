import { Router } from "express";
import { SignupController } from "../controllers";
const controller = new SignupController()
export const signupRouter = Router()
import { Validation } from "../middlewares/validation.middleware";
const valiadate = new Validation()
signupRouter.route("/").post(valiadate.validateSignup,controller.signupUser)
