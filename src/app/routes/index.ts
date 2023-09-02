import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { categoryRoutes } from "../modules/category/category.route";
import { bookRoutes } from "../modules/book/book.route";
import { orderRoutes } from "../modules/order/order.route";
const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/books", route: bookRoutes },
  { path: "/orders", route: orderRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const allRoutes = router;
