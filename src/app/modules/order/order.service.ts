import createError from "http-errors";
import { Order } from "@prisma/client";
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

const getAllOrder = async () => {
  const result = await prisma.order.findMany({
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

  console.log(isExist);

  await prisma.order.delete({
    where: {
      id,
    },
  });
};

export const orderService = {
  createOrder,
  getAllOrder,
  deleteOrder,
};
