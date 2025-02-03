import joi from 'joi';
import { isValidObjectId } from '../../middlewares/validation.middleware.js';

export const sendMessage = joi.object({
    content: joi.string().required(),
    reciever: joi.custom(isValidObjectId).required()
}).required();

export const getSingleMessage = joi.object({
    messageId: joi.custom(isValidObjectId).required()
}).required();

export const flags = {
    inbox: "inbox",
    outbox: "outbox"
}
export const getAllMessage = joi.object({
    flag: joi.string().valid(...Object.values(flags)).required()
}).required();