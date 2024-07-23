import express from "express";
import {
  deleteAccount,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate_limit.middleware.js";

const router = express.Router();

const userLimiter = limiter({ waitingMinute: 60, maxRequest: 20 });

router.route("/signup").post(userLimiter, signup);
router.route("/login").post(userLimiter, login);
router.route("/logout").post(userLimiter, verifyJWT, logout);
router.route("/deleteAccount").delete(userLimiter, verifyJWT, deleteAccount);

export default router;
