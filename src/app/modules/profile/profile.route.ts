import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { profileController } from "./profile.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.customer, UserRole.admin),
  profileController.getProfile
);

export const profileRoutes = router;
