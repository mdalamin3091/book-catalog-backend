import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { categoryController } from "./category.controller";
import validateRequest from "../../middlewares/validationRequest";
import { categoryValidation } from "./category.validation";
const router = express.Router();

router.post(
  "/create-category",
  auth(UserRole.admin),
  validateRequest(categoryValidation.create),
  categoryController.createCategory
);
router.get("/", auth(UserRole.admin), categoryController.getAllCategory);
router.get("/:id", auth(UserRole.admin), categoryController.getCategory);

router.patch(
  "/:id",
  auth(UserRole.admin),
  validateRequest(categoryValidation.update),
  categoryController.updateCategory
);

router.delete("/:id", auth(UserRole.admin), categoryController.deleteCategory);

export const categoryRoutes = router;
