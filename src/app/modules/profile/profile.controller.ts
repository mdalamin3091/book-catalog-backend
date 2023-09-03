import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";
import { IUser } from "../../../interface/IUser";
import httpStatus from "http-status";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user as IUser;
    const result = await profileService.getProfile(userId);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "profile information retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const profileController = {
  getProfile,
};
