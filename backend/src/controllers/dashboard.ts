import express, { Request, Response } from "express";

export const testeMiddleware = async (req: Request, res: Response) => {
  res.json("Dados confidenciasss");
};
