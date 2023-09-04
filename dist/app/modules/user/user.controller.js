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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../../../shared/pick");
const user_constant_1 = require("./user.constant");
const pagination_1 = require("../../../shared/pagination");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.pick)(req.query, user_constant_1.userFilterableFields);
        const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
        console.log(filterOptions, paginationOptions);
        const result = yield user_service_1.userService.getAllUsers(filterOptions, paginationOptions);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "all user retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.userService.getUser(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "user retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield user_service_1.userService.updateUser(id, data);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "user updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.userService.deleteUser(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "user deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.userController = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};
