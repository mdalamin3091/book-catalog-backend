import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";
const router = express.Router();

router.post(
  "/create-order",
  auth(UserRole.CUSTOMER),
  validateRequest(orderValidation.createOrderZodSchema),
  orderController.createOrder
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  orderController.getAllOrder
);

router.get(
  "/:orderId",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  orderController.getOrder
);

router.delete("/:id", auth(UserRole.ADMIN), orderController.deleteOrder);

export const orderRoutes = router;
