import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IJwtDataType } from "../interface/jwtInterface";

export const createToken = (
  data: IJwtDataType,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(data, secret, { expiresIn: expireTime });
  return token;
};

export const verifyJwtToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
