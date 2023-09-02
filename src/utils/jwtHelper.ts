import jwt, { Secret } from "jsonwebtoken";
import { IJwtDataType } from "../interface/jwtInterface";

export const createToken = (
  data: IJwtDataType,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(data, secret, { expiresIn: expireTime });
  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};
