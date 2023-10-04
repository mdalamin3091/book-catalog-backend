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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../../utils/prisma");
const pagination_1 = require("../../../shared/pagination");
const book_constant_1 = require("./book.constant");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.book.findFirst({
        where: {
            title: {
                equals: data === null || data === void 0 ? void 0 : data.title,
                mode: "insensitive",
            },
            genre: {
                equals: data === null || data === void 0 ? void 0 : data.genre,
                mode: "insensitive",
            },
            author: {
                equals: data === null || data === void 0 ? void 0 : data.author,
                mode: "insensitive",
            },
        },
    });
    if (isExist) {
        throw new http_errors_1.default.Conflict("Book already exist");
    }
    const result = yield prisma_1.prisma.book.create({ data });
    if (!result) {
        throw new http_errors_1.default.BadRequest("failed to create user");
    }
    return result;
});
const getAllBook = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const andCondition = [];
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    if (searchTerm) {
        andCondition.push({
            OR: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData) && Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => {
                if (book_constant_1.bookRelationalField.includes(key)) {
                    return {
                        [book_constant_1.bookRelationalFieldMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    if (key === "minPrice") {
                        return {
                            price: {
                                gte: Number(filterData[key]),
                            },
                        };
                    }
                    if (key === "maxPrice") {
                        return {
                            price: {
                                lte: Number(filterData[key]),
                            },
                        };
                    }
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    console.log(JSON.stringify(whereCondition));
    const result = yield prisma_1.prisma.book.findMany({
        where: whereCondition,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            category: true,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.prisma.book.count({ where: whereCondition });
    const totalPages = Math.ceil(total / limit);
    const previousPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages,
            previousPage,
            nextPage,
        },
        data: result,
    };
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("book not found");
    }
    return result;
});
const getBookByCategoryId = (categoryId, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    const result = yield prisma_1.prisma.book.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
    });
    const total = yield prisma_1.prisma.book.count({
        where: {
            categoryId,
        },
    });
    const totalPages = Math.ceil(total / limit);
    const previousPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 < totalPages ? page + 1 : null;
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages,
            previousPage,
            nextPage,
        },
        data: result,
    };
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("book not found");
    }
    const updatedBook = yield prisma_1.prisma.book.update({
        where: {
            id,
        },
        data,
        include: {
            category: true,
        },
    });
    return updatedBook;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("book not found");
    }
    yield prisma_1.prisma.book.delete({
        where: {
            id,
        },
    });
});
exports.bookService = {
    createBook,
    getAllBook,
    getBook,
    updateBook,
    deleteBook,
    getBookByCategoryId,
};
