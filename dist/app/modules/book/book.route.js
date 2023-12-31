"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const book_controller_1 = require("./book.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.auth)(client_1.UserRole.admin), (0, validationRequest_1.default)(book_validation_1.bookValidation.create), book_controller_1.bookController.createBook);
router.get("/", book_controller_1.bookController.getAllBook);
router.get("/:id", book_controller_1.bookController.getBook);
router.get("/:categoryId/category", book_controller_1.bookController.getBookByCategoryId);
router.patch("/:id", (0, auth_1.auth)(client_1.UserRole.admin), (0, validationRequest_1.default)(book_validation_1.bookValidation.update), book_controller_1.bookController.updateBook);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.admin), book_controller_1.bookController.deleteBook);
exports.bookRoutes = router;
