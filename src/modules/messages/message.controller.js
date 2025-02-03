import { Router } from "express";
import isAuthenticated from "../../middlewares/authentecation.middleware.js";
import isAuthorized from "../../middlewares/authorization.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as messageSchamea from "./message.validation.js";
import * as messageService from "./message.service.js";
import { roles } from "../../DB/models/user.model.js";
const router = Router();

// send message
router.post('/', isAuthenticated, isAuthorized(roles.user), validation(messageSchamea.sendMessage), messageService.sendMessage)

// get single message
router.get('/:messageId', isAuthenticated, isAuthorized(roles.user), validation(messageSchamea.getSingleMessage), messageService.getSingleMessage)

// get all messages
router.get('/', isAuthenticated, isAuthorized(roles.user), validation(messageSchamea.getAllMessage), messageService.getAllMessages)

export default router