"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = require("../../errors/handleZodError");
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = err.status || 500;
    let message = "Internal server error";
    let errorMessages = [
        { path: "", message },
    ];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.handleZodError)(err);
        message = zodError.message;
        errorMessages = zodError.errorMessages;
    }
    else if (err.name === "ConflictError") {
        message = err === null || err === void 0 ? void 0 : err.name;
        statusCode = err === null || err === void 0 ? void 0 : err.status;
        errorMessages = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.name;
        statusCode = err.status || 500;
        errorMessages = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessages,
    });
});
exports.globalErrorHandler = globalErrorHandler;
