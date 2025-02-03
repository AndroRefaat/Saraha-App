import { Router } from "express";
import * as authService from '../auth/auth.service.js';
import { asyncHandler } from '../../utils/errorHandeling/asyncHandler.js';
import { validation } from "../../middlewares/validation.middleware.js";
import * as authValidation from '../auth/auth.validation.js';
const router = Router();
router.post("/register", validation(authValidation.register), asyncHandler(authService.register));
router.post("/login", validation(authValidation.login), asyncHandler(authService.login));
router.get("/activateAccount/:token", asyncHandler(authService.activateAccount));



export default router;

