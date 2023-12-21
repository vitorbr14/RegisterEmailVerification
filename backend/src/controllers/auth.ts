import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BadRequestError } from "../errors/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Não foi possível criar um novo usuário.");
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new BadRequestError("E-mail já cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    throw new BadRequestError("Não foi possivel criar um novo usuário.");
  }

  //JWT
  const tokenJwt = jwt.sign(
    { user_id: newUser.id },
    process.env.JWT_PASS ?? "",
    { expiresIn: "1h" }
  );

  res.json(tokenJwt);
};

export const login = async (req: Request, res: Response) => {
  res.json("Login");
};
