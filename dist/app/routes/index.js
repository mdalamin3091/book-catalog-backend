"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const book_route_1 = require("../modules/book/book.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/auth", route: auth_route_1.authRoutes },
    { path: "/users", route: user_route_1.userRoutes },
    { path: "/categories", route: category_route_1.categoryRoutes },
    { path: "/books", route: book_route_1.bookRoutes },
    { path: "/orders", route: order_route_1.orderRoutes },
    { path: "/profile", route: profile_route_1.profileRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.allRoutes = router;
