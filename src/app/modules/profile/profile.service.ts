import createError from "http-errors";
import { prisma } from "../../../utils/prisma";

const getProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!result) {
    throw new createError.NotFound("profile information not found");
  }
  return result;
};

export const profileService = {
  getProfile,
};
