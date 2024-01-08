import express, { Request, Response } from "express";

import { BadRequestError, UnauthorizedError } from "../errors/api-errors"
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getUser = async (req: Request, res: Response) => {
const idUser = req.user

 const user = await prisma.user.findUnique({
    where: {
      id: idUser
    },
  });

  if(!user) {
    throw new BadRequestError('Usuário não encontrado!')
  }
  res.json(user);
};