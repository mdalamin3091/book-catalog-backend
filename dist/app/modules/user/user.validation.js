"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const updateUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        email: zod_1.default.string().optional(),
        password: zod_1.default.string().optional(),
        role: zod_1.default
            .enum([...Object.values(client_1.UserRole)])
            .optional(),
        contactNo: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        profileImg: zod_1.default.string().optional(),
    }),
});
exports.userValidation = {
    updateUserZodSchema,
};
