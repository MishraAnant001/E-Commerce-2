import * as yup from "yup"

export const userSignupSchema = yup.object().shape({
    email:yup.string().email("Invalid email format!").required(),
    username:yup.string().required().min(5).max(20),
    password:yup.string().required().min(8).max(16),
    phone:yup.string().required().length(10),
    role:yup.string().required()
})
export const userLoginSchema = yup.object().shape({
    username:yup.string().required().min(5).max(20),
    password:yup.string().required().min(8).max(16),
})

export const productSchema = yup.object().shape({
    
})
