import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
