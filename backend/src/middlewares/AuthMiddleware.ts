import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/api-errors";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type jwtPayload = {
  user_id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    throw new UnauthorizedError("Você não está autorizado!");
  }

  const token = authorization?.split(" ")[1];
  const { user_id } = jwt.verify(
    token,
    process.env.JWT_PASS ?? ""
  ) as jwtPayload;

  const userExists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!userExists) {
    throw new UnauthorizedError("Você não está autorizado!");
  }

  req.user = user_id;
  console.log(req.user);

  next();
};
