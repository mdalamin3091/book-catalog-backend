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
exports.userService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../../utils/prisma");
const user_utils_1 = require("./user.utils");
const user_constant_1 = require("./user.constant");
const pagination_1 = require("../../../shared/pagination");
const getAllUsers = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const andCondition = [];
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.calculatePagination)(paginationOptions);
    if (searchTerm) {
        andCondition.push({
            OR: user_constant_1.userSeachableField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData) && Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.prisma.user.findMany({
        where: whereCondition,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        select: user_utils_1.userFieldsExceptPassword,
    });
    const total = yield prisma_1.prisma.user.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
        select: user_utils_1.userFieldsExceptPassword,
    });
    if (!result) {
        throw new http_errors_1.default.NotFound("user not found");
    }
    return result;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new http_errors_1.default.NotFound("user does not exist");
    }
    const result = yield prisma_1.prisma.user.update({
        where: {
            id,
        },
        data,
        select: user_utils_1.userFieldsExceptPassword,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new http_errors_1.default.NotFound("user not found");
    }
    yield prisma_1.prisma.user.delete({ where: { id } });
});
exports.userService = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};
