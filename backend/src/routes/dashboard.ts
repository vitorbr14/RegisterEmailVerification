import express, { Request, Response, Router } from "express";
import { register, login } from "../controllers/auth";
import { createProduct } from "../controllers/dashboard";
const router = express.Router();

router.route("/dashboard/").get(createProduct);

export default router;
