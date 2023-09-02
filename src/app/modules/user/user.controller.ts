import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../shared/pagination";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filterOptions = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    console.log(filterOptions, paginationOptions);
    const result = await userService.getAllUsers(
      filterOptions,
      paginationOptions
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "all user retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await userService.getUser(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "user retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "user updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "user deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
