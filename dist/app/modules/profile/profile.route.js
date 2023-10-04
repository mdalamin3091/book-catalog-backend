"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)(client_1.UserRole.customer, client_1.UserRole.admin), profile_controller_1.profileController.getProfile);
exports.profileRoutes = router;
