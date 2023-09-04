"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const category_controller_1 = require("./category.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post("/create-category", (0, auth_1.auth)(client_1.UserRole.ADMIN), (0, validationRequest_1.default)(category_validation_1.categoryValidation.create), category_controller_1.categoryController.createCategory);
router.get("/", (0, auth_1.auth)(client_1.UserRole.ADMIN), category_controller_1.categoryController.getAllCategory);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), category_controller_1.categoryController.getCategory);
router.patch("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), (0, validationRequest_1.default)(category_validation_1.categoryValidation.update), category_controller_1.categoryController.updateCategory);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.categoryRoutes = router;
