import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";
import httpStatus from "http-status";
import { IUser } from "../../../interface/IUser";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const data = req.body.orderedBooks;
    const result = await orderService.createOrder(user as IUser, data);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "ordered created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.getAllOrder();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "all order retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await orderService.deleteOrder(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "order deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
  deleteOrder,
};
