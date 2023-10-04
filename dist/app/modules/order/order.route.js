"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post("/create-order", (0, auth_1.auth)(client_1.UserRole.customer), (0, validationRequest_1.default)(order_validation_1.orderValidation.createOrderZodSchema), order_controller_1.orderController.createOrder);
router.get("/", (0, auth_1.auth)(client_1.UserRole.admin, client_1.UserRole.customer), order_controller_1.orderController.getAllOrder);
router.get("/:orderId", (0, auth_1.auth)(client_1.UserRole.admin, client_1.UserRole.customer), order_controller_1.orderController.getOrder);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.admin), order_controller_1.orderController.deleteOrder);
exports.orderRoutes = router;
