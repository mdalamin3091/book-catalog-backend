import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_time: process.env.JWT_EXPIRE_TIME,
  },
};
