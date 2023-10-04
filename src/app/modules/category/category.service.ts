import createError from "http-errors";
import { Category, Prisma } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { IPaginationOptions } from "../../../interface/pagination";
import { ICategoryFilters } from "./category.interface";
import { calculatePagination } from "../../../shared/pagination";
import { categorySearchableFields } from "./category.constant";
import { IGenericResponseType } from "../../../interface/IGenericResponseType";

const createCategory = async (data: Category): Promise<Category> => {
  const isExist = await prisma.category.findFirst({
    where: {
      title: {
        equals: data?.title,
        mode: "insensitive",
      },
    },
  });
  if (isExist) {
    throw new createError.Conflict("category already exist");
  }
  const result = await prisma.category.create({ data });
  if (!result) {
    throw new createError.BadRequest("failed to create user");
  }
  return result;
};

const getAllCategory = async (
  filterOptions: ICategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseType<Category[]>> => {
  const { searchTerm, ...filterData } = filterOptions;
  const andCondition = [];
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  if (searchTerm) {
    andCondition.push({
      OR: categorySearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData) && Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition: Prisma.CategoryWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.category.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      books: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.category.count({ where: whereCondition });

  const totalPages = Math.ceil(total / limit);
  const previousPage = page - 1 > 0 ? page - 1 : null;
  const nextPage = page + 1 < totalPages ? page + 1 : null;

  return {
    meta: {
      page,
      size: limit,
      total,
      totalPages,
      previousPage,
      nextPage,
    },
    data: result,
  };
};

const getCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  if (!result) {
    throw new createError.NotFound("book not found");
  }

  return result;
};

const updateCategory = async (id: string, data: Partial<Category>) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createError.NotFound("book not found");
  }

  await prisma.category.update({
    where: {
      id,
    },
    data,
    include: {
      books: true,
    },
  });
};
const deleteCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createError.NotFound("book not found");
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const categoryService = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
