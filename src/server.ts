import { Server } from "http";
import { app } from "./app";
import config from "./config";

async function connectDB() {
  const server: Server = app.listen(config.port, () => {
    console.log("server running on port", config.port);
  });

  const existHandler = () => {
    if (server) {
      server.close(() => {
        console.log("server is closed");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    existHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  process.on("uncaughtExceptionMonitor", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.log("sigterm received");
    if (server) {
      server.close();
    }
  });
}

connectDB();
