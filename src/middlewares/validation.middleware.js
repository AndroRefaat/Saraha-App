import { Types } from "mongoose";
import joi from "joi";
export const validation = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const result = schema.validate(data, { abortEarly: false });
        if (result.error) {
            const messageList = result.error.details.map(err => err.message);
            return next(new Error(messageList, { cause: 400 }));
        }
        return next();
    }
}

export const isValidObjectId = (value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;
    return helper.message("Invalid Id");
}

export const generalField = {
    email: joi.string().email(),
    password: joi.string(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    userName: joi.string().min(3).max(15),
    phone: joi.string().required(),
    gender: joi.string().valid("male", "female").required(),
    roles: joi.string().valid("user", "admin")
}