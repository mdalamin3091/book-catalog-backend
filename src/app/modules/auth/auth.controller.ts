import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await authService.signupUser(data);
    console.log(result);
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signinUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const token = await authService.signinUser(data);
    res.cookie("access_token", token);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "user signin successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signupUser,
  signinUser,
};
