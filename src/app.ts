import createError from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { allRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
export const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("in the name of Allah.");
});

// app.use(function (req, res, next) {
//   next(createError(401, "Please login to view this page."));
//   const err = new createError.Conflict()
// });

app.use(globalErrorHandler);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});
