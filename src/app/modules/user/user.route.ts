import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { userValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getAllUsers);
router.get("/:id", auth(UserRole.ADMIN), userController.getUser);
router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(userValidation.updateUserZodSchema),
  userController.updateUser
);

router.delete("/:id", auth(UserRole.ADMIN), userController.deleteUser);

export const userRoutes = router;
