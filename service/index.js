import express from "express";
import cookieParser from "cookie-parser";

import authService from "./auth-service.js";
import gameService from "./game-service.js";
import questionService from "./question-service.js";

const app = express();

app.use(express.static("../dist"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authService);
app.use("/game", gameService);
app.use("/question", questionService);

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
