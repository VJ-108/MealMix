import express from "express";
import {
  createRecipe,
  getForRecipePage,
  getDetailedRecipe,
} from "../controllers/recipe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate_limit.middleware.js";

const router = express.Router();

const GetrecipeLimiter = limiter({ waitingMinute: 5, maxRequest: 50 });
const createRecipeLimiter = limiter({ waitingMinute: 30, maxRequest: 100 });

router
  .route("/createRecipe")
  .post(createRecipeLimiter, verifyJWT, createRecipe);
router
  .route("/getForRecipePage")
  .get(GetrecipeLimiter, verifyJWT, getForRecipePage);
router
  .route("/getDetailedRecipe")
  .get(GetrecipeLimiter, verifyJWT, getDetailedRecipe);

export default router;
