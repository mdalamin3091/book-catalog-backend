import { NextFunction, Request, Response } from "express";
import { paginationFields } from "../../../shared/pagination";
import { pick } from "../../../shared/pick";
import { categoryService } from "./category.service";
import httpStatus from "http-status";
import { categoryFilterableFields } from "./category.constant";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const result = await categoryService.createCategory(data);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "category created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterOptions = pick(req.query, categoryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    console.log(filterOptions, paginationOptions);
    const result = await categoryService.getAllCategory(
      filterOptions,
      paginationOptions
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "all Category retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await categoryService.getCategory(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Category retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await categoryService.updateCategory(id, data);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Category updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await categoryService.deleteCategory(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
