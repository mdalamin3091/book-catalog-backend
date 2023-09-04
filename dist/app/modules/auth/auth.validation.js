"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: "name is required",
        }),
        email: zod_1.default.string({
            required_error: "email is required",
        }),
        password: zod_1.default.string({
            required_error: "password is required",
        }),
        role: zod_1.default.enum([...Object.values(client_1.UserRole)], {
            required_error: "role is required",
        }),
        contactNo: zod_1.default.string({
            required_error: "contactNo is required",
        }),
        address: zod_1.default.string({
            required_error: "address is required",
        }),
        profileImg: zod_1.default.string({
            required_error: "profile image is required",
        }),
    }),
});
exports.authValidation = {
    createUserZodSchema,
};
