import express from "express";
import {
  createRecipe,
  getForRecipePage,
  getDetailedRecipe,
  generateRecipe,
  suggestDishName,
  updateRating,
} from "../controllers/recipe.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rate_limit.middleware.js";

const router = express.Router();

const generateRecipeLimiter = limiter({ waitingMinute: 30, maxRequest: 5 });
const suggestDishNameLimiter = limiter({ waitingMinute: 30, maxRequest: 10 });
const createRecipeLimiter = limiter({ waitingMinute: 10, maxRequest: 1 });
const GetrecipeLimiter = limiter({ waitingMinute: 5, maxRequest: 50 });

router
  .route("/generateRecipe")
  .post(generateRecipeLimiter, verifyJWT, generateRecipe);
router
  .route("/suggestDishName")
  .post(suggestDishNameLimiter, verifyJWT, suggestDishName);
router
  .route("/createRecipe")
  .post(createRecipeLimiter, verifyJWT, createRecipe);
router.route("/getForRecipePage").get(GetrecipeLimiter, getForRecipePage);
router.route("/getDetailedRecipe").post(GetrecipeLimiter, getDetailedRecipe);
router.route("/updateRating").post(createRecipeLimiter, verifyJWT, updateRating);

export default router;
