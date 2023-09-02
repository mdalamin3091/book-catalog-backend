import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z
      .array(
        z.object({
          bookId: z.string({
            required_error: "book id is required",
          }),
          quantity: z.number({
            required_error: "quantity is required",
          }),
        })
      )
      .nonempty({ message: "ordered books cannot be empty" }),
  }),
});

export const orderValidation = {
  createOrderZodSchema,
};
