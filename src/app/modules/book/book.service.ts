import createError from "http-errors";
import { Book, Prisma } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { IPaginationOptions } from "../../../interface/pagination";
import { IBookFilters } from "./book.interface";
import { calculatePagination } from "../../../shared/pagination";
import {
  bookRelationalField,
  bookRelationalFieldMapper,
  bookSearchableFields,
} from "./book.constant";
import { IGenericResponseType } from "../../../interface/IGenericResponseType";

const createBook = async (data: Book): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      title: {
        equals: data?.title,
        mode: "insensitive",
      },
      genre: {
        equals: data?.genre,
        mode: "insensitive",
      },
      author: {
        equals: data?.author,
        mode: "insensitive",
      },
    },
  });

  if (isExist) {
    throw new createError.Conflict("Book already exist");
  }
  const result = await prisma.book.create({ data });
  if (!result) {
    throw new createError.BadRequest("failed to create user");
  }
  return result;
};

const getAllBook = async (
  filterOptions: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseType<Book[]>> => {
  const { searchTerm, ...filterData } = filterOptions;
  const andCondition = [];
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  if (searchTerm) {
    andCondition.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData) && Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => {
        if (bookRelationalField.includes(key)) {
          return {
            [bookRelationalFieldMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          if (key === "minPrice") {
            return {
              price: {
                gte: Number((filterData as any)[key]),
              },
            };
          }

          if (key === "maxPrice") {
            return {
              price: {
                lte: Number((filterData as any)[key]),
              },
            };
          }
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.BookWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  console.log(JSON.stringify(whereCondition));

  const result = await prisma.book.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.book.count({ where: whereCondition });
  const totalPages = Math.ceil(total / limit);
  const previousPage = page - 1 > 0 ? page - 1 : null;
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
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

const getBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new createError.NotFound("book not found");
  }

  return result;
};

const getBookByCategoryId = async (
  categoryId: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseType<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });

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

const updateBook = async (id: string, data: Partial<Book>): Promise<Book> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createError.NotFound("book not found");
  }

  const updatedBook = await prisma.book.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
    },
  });

  return updatedBook;
};

const deleteBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new createError.NotFound("book not found");
  }

  await prisma.book.delete({
    where: {
      id,
    },
  });
};

export const bookService = {
  createBook,
  getAllBook,
  getBook,
  updateBook,
  deleteBook,
  getBookByCategoryId,
};
