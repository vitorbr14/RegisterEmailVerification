import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/api-errors";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req: Request, res: Response) => {
//get id by the token
const user_id = req.user
const {userCode} = req.body
// find user
const user = await prisma.user.findUnique({
  where: {
    id:user_id,
  },
})

//compare email verification codes
if(userCode != user?.emailCode){
    throw new BadRequestError('Código errado!')
}

//change state of isActivated

const updateUser = await prisma.user.update({
  where: {
    id: user_id,
  },
  data: {
    isActivated: true,
  },
})
res.json(updateUser)
};