import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { bookController } from "./book.controller";
import validateRequest from "../../middlewares/validationRequest";
import { bookValidation } from "./book.validation";
const router = express.Router();

router.post(
  "/create-book",
  auth(UserRole.admin),
  validateRequest(bookValidation.create),
  bookController.createBook
);

router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getBook);
router.get("/:categoryId/category", bookController.getBookByCategoryId);

router.patch(
  "/:id",
  auth(UserRole.admin),
  validateRequest(bookValidation.update),
  bookController.updateBook
);

router.delete("/:id", auth(UserRole.admin), bookController.deleteBook);

export const bookRoutes = router;
