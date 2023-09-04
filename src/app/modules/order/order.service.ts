import createError from "http-errors";
import { Order, Prisma, UserRole } from "@prisma/client";
import { IUser } from "../../../interface/IUser";
import { prisma } from "../../../utils/prisma";
import { IOrderBookData } from "./order.interface";

const createOrder = async (
  user: IUser,
  data: IOrderBookData[]
): Promise<Order | null> => {
  const result = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: { userId: user.userId },
    });

    for (let index = 0; index < data.length; index++) {
      const createOrderedBook = await tx.orderedBook.create({
        data: {
          bookId: data[index].bookId,
          quantity: data[index].quantity,
          orderId: createdOrder.id,
        },
      });
      console.log("createOrderedBook", createOrderedBook);
    }

    const responseOrder = await tx.order.findFirst({
      where: {
        id: createdOrder.id,
      },
      include: {
        orderedBooks: true,
      },
    });

    return responseOrder;
  });

  return result;
};

const getAllOrder = async (user: IUser) => {
  const { userId, role } = user;
  const whereCondition: Prisma.OrderWhereInput =
    role === UserRole.CUSTOMER ? { userId } : {};

  const result = await prisma.order.findMany({
    where: whereCondition,
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const deleteOrder = async (id: string) => {
  const isExist = await prisma.order.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new createError.NotFound("ordered not found");
  }

  await prisma.order.delete({
    where: {
      id,
    },
  });
};

const getOrder = async (user: IUser, orderId: string) => {
  const { userId, role } = user;

  const whereCondition: Prisma.OrderWhereUniqueInput =
    role === UserRole.ADMIN ? { id: orderId } : { userId, id: orderId };
  const result = await prisma.order.findUnique({
    where: whereCondition,
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

export const orderService = {
  createOrder,
  getAllOrder,
  deleteOrder,
  getOrder,
};
