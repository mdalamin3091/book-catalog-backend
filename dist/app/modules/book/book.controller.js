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
exports.bookController = void 0;
const pagination_1 = require("../../../shared/pagination");
const pick_1 = require("../../../shared/pick");
const book_service_1 = require("./book.service");
const http_status_1 = __importDefault(require("http-status"));
const book_constant_1 = require("./book.constant");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield book_service_1.bookService.createBook(data);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "book created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.pick)(req.query, book_constant_1.bookFilterableFields);
        const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
        const result = yield book_service_1.bookService.getAllBook(filterOptions, paginationOptions);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "all Book retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.bookService.getBook(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "book retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getBookByCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
        const result = yield book_service_1.bookService.getBookByCategoryId(categoryId, paginationOptions);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "book retrieved successfully by category id",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield book_service_1.bookService.updateBook(id, data);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "book updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.bookService.deleteBook(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "book deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.bookController = {
    createBook,
    getAllBook,
    getBook,
    updateBook,
    getBookByCategoryId,
    deleteBook,
};
