import createError from "http-errors";
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { userFieldsExceptPassword } from "./user.utils";
import { userSeachableField } from "./user.constant";
import { IFilterOptions, UserWithoutPassword } from "./user.interface";
import { IPaginationOptions } from "../../../interface/pagination";
import { calculatePagination } from "../../../shared/pagination";
import { IGenericResponseType } from "../../../interface/IGenericResponseType";

const getAllUsers = async (
  filterOptions: IFilterOptions,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponseType<UserWithoutPassword[]>> => {
  const { searchTerm, ...filterData } = filterOptions;
  const andCondition = [];
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  if (searchTerm) {
    andCondition.push({
      OR: userSeachableField.map((field) => ({
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
          contains: (filterData as any)[key],
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.user.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    select: userFieldsExceptPassword,
  });

  const total = await prisma.user.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getUser = async (id: string): Promise<UserWithoutPassword | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: userFieldsExceptPassword,
  });
  if (!result) {
    throw new createError.NotFound("user not found");
  }
  return result;
};

const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<UserWithoutPassword | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new createError.NotFound("user does not exist");
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: userFieldsExceptPassword,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new createError.NotFound("user not found");
  }
  await prisma.user.delete({ where: { id } });
};

export const userService = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
