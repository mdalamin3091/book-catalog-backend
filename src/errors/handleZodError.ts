import { ZodError } from "zod";

export const handleZodError = (
  error: ZodError
): { message: string; errorMessages: { path: string; message: string }[] } => {
  const message = error.name;
  const errorMessages = error.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1] as string,
    message: issue.message,
  }));

  return { message, errorMessages };
};
