import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import client from "./redis/client.js";
import { productMiddleware, rateLimiter } from "./middlewares/product.js";
configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const init = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "Hello",
      });
    }, 2000);
  });
};

app.get(
  "/product",
  rateLimiter({
    limit: 5,
    timer: 10,
    key: "product",
  }),
  productMiddleware("name"),
  async (req, res) => {
    const name = await init();

    //Caching
    client.setex("name", 60, JSON.stringify(name));

    res.json({
      name,
    });
  }
);

app.get(
  "/",
  rateLimiter({ limit: 10, timer: 60, key: "home" }),
  async (req, res) => {
    res.send("Hello World!");
  }
);

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
