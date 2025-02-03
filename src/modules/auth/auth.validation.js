import joi from "joi";
import { generalField } from "../../middlewares/validation.middleware.js";


export const register = joi.object({
    email: generalField.email.required(),
    password: generalField.password.required(),
    confirmPassword: generalField.confirmPassword.required(),
    userName: generalField.userName.required(),
    phone: generalField.phone.required(),
    gender: generalField.gender.required(),
    roles: generalField.roles
}).required()




export const login = joi.object({
    email: generalField.email.required(),
    password: generalField.password.required(),
}).required()