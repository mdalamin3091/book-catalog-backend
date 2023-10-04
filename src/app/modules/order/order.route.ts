import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";
const router = express.Router();

router.post(
  "/create-order",
  auth(UserRole.customer),
  validateRequest(orderValidation.createOrderZodSchema),
  orderController.createOrder
);

router.get(
  "/",
  auth(UserRole.admin, UserRole.customer),
  orderController.getAllOrder
);

router.get(
  "/:orderId",
  auth(UserRole.admin, UserRole.customer),
  orderController.getOrder
);

router.delete("/:id", auth(UserRole.admin), orderController.deleteOrder);

export const orderRoutes = router;
