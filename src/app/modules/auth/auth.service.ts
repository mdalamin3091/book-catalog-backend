import createError from "http-errors";
import { User } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../../config";
import { createToken } from "../../../utils/jwtHelper";
import { Secret } from "jsonwebtoken";

const signupUser = async (data: User) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (isExistUser) {
    throw new createError.Conflict(
      "user already exist! try with another email"
    );
  }

  const hashPassword = bcrypt.hashSync(
    data.password,
    Number(config.bcrypt_solt_round)
  );

  data.password = hashPassword;
  const createdUser = await prisma.user.create({
    data,
    select: {
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return createdUser;
};

const signinUser = async (
  data: Pick<User, "email" | "password">
): Promise<string> => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!isExistUser) {
    throw new createError.NotFound("User does not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isExistUser.password
  );

  if (!isPasswordMatched) {
    throw createError(httpStatus.UNAUTHORIZED, "crediential wrongs");
  }

  const accessToken = createToken(
    { userId: isExistUser.id, role: isExistUser.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_time as string
  );

  return accessToken;
};

export const authService = {
  signupUser,
  signinUser,
};
