import express, { Request, Response, Router } from "express";
import { register, login } from "../controllers/auth";
import { testeMiddleware } from "../controllers/dashboard";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/dados").get(testeMiddleware);

export default router;
