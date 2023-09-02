import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validationRequest";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(authValidation.createUserZodSchema),
  authController.signupUser
);

router.post("/signin", authController.signinUser);

export const authRoutes = router;
