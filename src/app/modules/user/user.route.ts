import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { userValidation } from "./user.validation";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.patch(
  "/:id",
  validateRequest(userValidation.updateUserZodSchema),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
