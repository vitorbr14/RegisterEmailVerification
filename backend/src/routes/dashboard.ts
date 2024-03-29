import express, { Request, Response, Router } from "express";
import { register, login } from "../controllers/auth";
import { getUser } from "../controllers/dashboard";

const router = express.Router();

router.route("/").get(getUser);
export default router;
