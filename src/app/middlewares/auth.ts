import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import httpStatus from "http-status";
import config from "../../config";
import { verifyJwtToken } from "../../utils/jwtHelper";
import { Secret } from "jsonwebtoken";

export const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        next(
          createError(httpStatus.UNAUTHORIZED, "your are unauthorized user")
        );
      }
      let verifiedUserToken;
      verifiedUserToken = verifyJwtToken(
        token as string,
        config.jwt.jwt_secret as Secret
      );

      req.user = verifiedUserToken; // userId, role;

      if (roles.length > 0 && !roles.includes(verifiedUserToken.role)) {
        next(createError(httpStatus.FORBIDDEN, "your are forbidden user"));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
