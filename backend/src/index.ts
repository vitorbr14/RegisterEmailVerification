import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import auth from "./routes/auth";
import fs from "fs";
import { errorMiddleware } from "./middlewares/error";
import cors from "cors";
import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
} from "./errors/api-errors";
import dashboard from "./routes/dashboard";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/", dashboard);
app.use("/api/v1/auth", auth);

app.use(errorMiddleware);

app.listen(5003, () => {
  console.log("Server is running on port 5656");
});
