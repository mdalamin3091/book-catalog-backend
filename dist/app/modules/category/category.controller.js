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
exports.categoryController = void 0;
const pagination_1 = require("../../../shared/pagination");
const pick_1 = require("../../../shared/pick");
const category_service_1 = require("./category.service");
const http_status_1 = __importDefault(require("http-status"));
const category_constant_1 = require("./category.constant");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield category_service_1.categoryService.createCategory(data);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "category created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.pick)(req.query, category_constant_1.categoryFilterableFields);
        const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
        console.log(filterOptions, paginationOptions);
        const result = yield category_service_1.categoryService.getAllCategory(filterOptions, paginationOptions);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "all Category retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield category_service_1.categoryService.getCategory(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Category retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield category_service_1.categoryService.updateCategory(id, data);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield category_service_1.categoryService.deleteCategory(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Category deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.categoryController = {
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
