import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";
const router = express.Router();

router.post(
  "/create-order",
  auth(UserRole.ADMIN),
  validateRequest(orderValidation.createOrderZodSchema),
  orderController.createOrder
);

router.get(
  "/",
  // auth(UserRole.ADMIN),
  orderController.getAllOrder
);
router.delete(
  "/:id",
  // auth(UserRole.ADMIN),
  orderController.deleteOrder
);

// router.get("/:id", bookController.getBook);
// router.get("/:categoryId/category", bookController.getBookByCategoryId);

// router.patch(
//   "/:id",
//   auth(UserRole.ADMIN),
//   validateRequest(bookValidation.update),
//   bookController.updateBook
// );

// router.delete("/:id", auth(UserRole.ADMIN), bookController.deleteBook);

export const orderRoutes = router;
