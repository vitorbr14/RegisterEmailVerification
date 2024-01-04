import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BadRequestError, NotFoundError } from "../errors/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken";
import nodemailer from "nodemailer";
import { sendMail, transporter, MailOptions } from "../utils/sendMail";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json(user);
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

  //Create JWT Token
  // const token = createToken(newUser);

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
    Clique aqui para ir para a página de verificação: http://localhost:5173/verify/${newUser.id}`, //
  };

  await sendMail(transporter, mailOptions);
  res.json({ userData: newUser });
};

export const login = async (req: Request, res: Response) => {
  res.json("Login");
};

interface IdToNumber {
  id: number;
}
export const verifyEmail = async (req: Request, res: Response) => {
  const { id: idUsuario } = req.params;
  const { user_id } = req.body;

  //Find user by the ID

  const user = await prisma.user.findFirst({
    where: {
      id: Number(idUsuario),
    },
  });

  if (!user) {
    throw new NotFoundError("Usuário não encontrado");
  }
  if (user_id != user.emailCode) {
    throw new BadRequestError("Código utilizado não está correto.");
  }

  const updateUser = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      isActivated: true,
    },
  });

  res.json({ updateUser });
};
