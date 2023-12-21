import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BadRequestError } from "../errors/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken";
import nodemailer from "nodemailer";

import {
  Transporter as NodeMailerTransporter,
  SentMessageInfo,
} from "nodemailer";

interface MailOptions {
  from: {
    name: string;
    address: string;
  };
  to: string;
  subject: string;
  text: string;
  html: string;
}

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

  //Create JWT Token
  const token = createToken(newUser);

  //NODEMAILER
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: {
      name: "Propriedade Name",
      address: "t30238897@gmail.com",
    }, // sender address
    to: "goyeno5863@aseall.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `http://localhost:5003/api/v1/auth${token}`, // html body
  };

  const sendMail = async (
    trans: NodeMailerTransporter,
    options: MailOptions
  ) => {
    await transporter.sendMail(options);
    console.log("deu?");
  };
  await sendMail(transporter, mailOptions);
  res.json(newUser);
};

export const login = async (req: Request, res: Response) => {
  res.json("Login");
};
