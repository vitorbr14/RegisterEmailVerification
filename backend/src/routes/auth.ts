import express, { Request, Response, Router } from "express";
import { register, login, verifyEmail } from "../controllers/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify/:id").post(verifyEmail);
// router.route("/dados").get(testeMiddleware);

export default router;
