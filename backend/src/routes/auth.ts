import express, { Request, Response, Router } from "express";
import {
  register,
  login,
  getAllUsers,
  // getUser,
  deleteUser,
 
} from "../controllers/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/users").get(getAllUsers);

router.route("/users/:id").delete(deleteUser);



export default router;
