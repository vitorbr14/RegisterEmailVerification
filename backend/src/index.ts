import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import auth from "./routes/auth";

import { errorMiddleware } from "./middlewares/error";
import cors from "cors";
import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
} from "./errors/api-errors";
import dashboard from "./routes/dashboard";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import emailVerification from './routes/emailverification'

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/dashboard", authMiddleware,dashboard);
app.use("/api/v1/auth", auth);
app.use("/api/v1/verify", authMiddleware, emailVerification);
app.use(errorMiddleware);

app.listen(5003, () => {
  console.log("Server is running on port 5656");
});
