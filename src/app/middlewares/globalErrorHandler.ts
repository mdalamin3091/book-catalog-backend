import createError from "http-errors";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../../errors/handleZodError";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.status || 500;
  let message = "Internal server error";
  let errorMessages: { path: string; message: string }[] = [
    { path: "", message },
  ];

  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    message = zodError.message;
    errorMessages = zodError.errorMessages;
  } else if (err.name === "ConflictError") {
    message = err?.name;
    statusCode = err?.status;
    errorMessages = [{ path: "", message: err?.message }];
  } else if (err instanceof Error) {
    message = err?.name;
    statusCode = (err as any).status || 500;
    errorMessages = [{ path: "", message: err?.message }];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
  });
};
