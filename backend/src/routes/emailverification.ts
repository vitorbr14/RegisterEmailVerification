import express, { Request, Response, Router } from "express";
import { register, login } from "../controllers/auth";
import { verifyEmail } from "../controllers/verifyEmail";

const router = express.Router();

router.route("/").patch(verifyEmail);

export default router;
