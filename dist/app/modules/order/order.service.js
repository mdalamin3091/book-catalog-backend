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
exports.orderService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../utils/prisma");
const createOrder = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield tx.order.create({
            data: { userId: user.userId },
        });
        for (let index = 0; index < data.length; index++) {
            const createOrderedBook = yield tx.orderedBook.create({
                data: {
                    bookId: data[index].bookId,
                    quantity: data[index].quantity,
                    orderId: createdOrder.id,
                },
            });
            console.log("createOrderedBook", createOrderedBook);
        }
        const responseOrder = yield tx.order.findFirst({
            where: {
                id: createdOrder.id,
            },
            include: {
                orderedBooks: true,
            },
        });
        return responseOrder;
    }));
    return result;
});
const getAllOrder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const whereCondition = role === client_1.UserRole.customer ? { userId } : {};
    const result = yield prisma_1.prisma.order.findMany({
        where: whereCondition,
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.prisma.order.findFirst({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new http_errors_1.default.NotFound("ordered not found");
    }
    yield prisma_1.prisma.order.delete({
        where: {
            id,
        },
    });
});
const getOrder = (user, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const whereCondition = role === client_1.UserRole.admin ? { id: orderId } : { userId, id: orderId };
    const result = yield prisma_1.prisma.order.findUnique({
        where: whereCondition,
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
exports.orderService = {
    createOrder,
    getAllOrder,
    deleteOrder,
    getOrder,
};
