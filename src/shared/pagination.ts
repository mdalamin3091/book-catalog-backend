import { optional } from "zod";
import { IPaginationOptions } from "../interface/pagination";

export const paginationFields = ["page", "limit", "sortBy", "sortOrder"];

type paginationResponseType = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

export const calculatePagination = (
  options: IPaginationOptions
): paginationResponseType => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = page * limit - limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
