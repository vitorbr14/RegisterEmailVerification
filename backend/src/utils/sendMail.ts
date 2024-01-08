import nodemailer from "nodemailer";

import {
  Transporter as NodeMailerTransporter,
  SentMessageInfo,
} from "nodemailer";

export interface transporterr {
  id: string;
}
export interface MailOptions {
  from: {
    name: string;
    address: string;
  };
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const transporter = nodemailer.createTransport({
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

export const sendMail = async (
  trans: NodeMailerTransporter<SentMessageInfo>,
  options: MailOptions
) => {
  await transporter.sendMail(options);
  console.log("Email Enviado com sucesso");
};
