import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken";
import nodemailer from "nodemailer";
import { sendMail, transporter, MailOptions } from "../utils/sendMail";



export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};





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

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create random number to email verification
  const randomEmailCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  const randomNumber = randomEmailCode();

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailCode: randomNumber,
    },
  });

  if (!newUser) {
    throw new BadRequestError("Não foi possivel criar um novo usuário.");
  }

  // Create JWT Token
  const token = createToken(newUser);

  //NODEMAILER
  const mailOptions: MailOptions = {
    from: {
      name: "WebSite",
      address: "t30238897@gmail.com",
    }, // sender address
    to: email,
    subject: "Codigo de Verificação!",
    text: `Obrigado por fazer parte da nossa equipe, ${name}!`,
    html: `Seja bem vindo, ${name}!<br>Seu codigo de verificação é: <h3>${randomNumber}</h3><br>
    Clique aqui para ir para a página de verificação: <a href="http://localhost:5173/verify/">Aqui</a>`, //
  };

  await sendMail(transporter, mailOptions);
  res.json({ userData: newUser, token });
};

export const login = async (req: Request, res: Response) => {
  res.json("Login");
};

interface IdToNumber {
  id: number;
}


export const deleteUser = async (req: Request, res: Response) => {
  const { id: IdUsuario } = req.params;
  const { email } = req.body;

  const deleteUsers = await prisma.user.deleteMany({});

  if (!deleteUser) {
    throw new BadRequestError("Usuário não encontado");
  }

  console.log(Number(IdUsuario));
  res.json("deleteUser");
};

