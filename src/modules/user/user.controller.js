import { Router } from "express";
import * as userService from './user.service.js';
import isAuthenticated from "../../middlewares/authentecation.middleware.js";
import isAuthorized from "../../middlewares/authorization.js";
import { roles } from "../../DB/models/user.model.js";
import * as userValidation from './user.validation.js';
import { validation } from "../../middlewares/validation.middleware.js";
const router = Router();

router.get('/profile', isAuthenticated, isAuthorized(roles.user), userService.profile)

router.patch('/updateProfile', isAuthenticated, isAuthorized(roles.user, roles.admin), validation(userValidation.updateProfile), userService.updateProfile)

router.patch('/updatePassword', isAuthenticated, isAuthorized(roles.user, roles.admin), validation(userValidation.updatePassword), userService.updatePassword)

router.delete('/freezeAccount', isAuthenticated, isAuthorized(roles.user, roles.admin), userService.freezeAccount)
export default router;