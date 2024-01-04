import express, { Request, Response, Router } from "express";
import {
  register,
  login,
  verifyEmail,
  getAllUsers,
  getUser,
} from "../controllers/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify/:id").patch(verifyEmail);
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUser);
// router.route("/dados").get(testeMiddleware);

export default router;
