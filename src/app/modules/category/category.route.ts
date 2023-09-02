import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { categoryController } from "./category.controller";
import validateRequest from "../../middlewares/validationRequest";
import { categoryValidation } from "./category.validation";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidation.create),
  categoryController.createCategory
);
router.get("/", auth(UserRole.ADMIN), categoryController.getAllCategory);
router.get("/:id", auth(UserRole.ADMIN), categoryController.getCategory);

router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidation.update),
  categoryController.updateCategory
);

router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const categoryRoutes = router;
