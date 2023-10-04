"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)(client_1.UserRole.admin), user_controller_1.userController.getAllUsers);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.admin), user_controller_1.userController.getUser);
router.patch("/:id", (0, auth_1.auth)(client_1.UserRole.admin), (0, validationRequest_1.default)(user_validation_1.userValidation.updateUserZodSchema), user_controller_1.userController.updateUser);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.admin), user_controller_1.userController.deleteUser);
exports.userRoutes = router;
