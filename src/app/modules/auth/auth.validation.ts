import { UserRole } from "@prisma/client";
import z from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]], {
      required_error: "role is required",
    }),
    contactNo: z.string({
      required_error: "contactNo is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    profileImg: z.string({
      required_error: "profile image is required",
    }),
  }),
});

export const authValidation = {
  createUserZodSchema,
};
