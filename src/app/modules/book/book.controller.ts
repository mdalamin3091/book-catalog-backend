import { NextFunction, Request, Response } from "express";
import { paginationFields } from "../../../shared/pagination";
import { pick } from "../../../shared/pick";
import { bookService } from "./book.service";
import httpStatus from "http-status";
import { bookFilterableFields } from "./book.constant";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await bookService.createBook(data);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "book created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filterOptions = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await bookService.getAllBook(
      filterOptions,
      paginationOptions
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "all Book retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await bookService.getBook(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "book retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getBookByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await bookService.getBookByCategoryId(
      categoryId,
      paginationOptions
    );
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "book retrieved successfully by category id",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await bookService.updateBook(id, data);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "book updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await bookService.deleteBook(id);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "book deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const bookController = {
  createBook,
  getAllBook,
  getBook,
  updateBook,
  getBookByCategoryId,
  deleteBook,
};
